import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { generateReferralCode } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, referralCode } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Name, email, and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User with this email already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Generate referral code for new user
    const userReferralCode = generateReferralCode();

    // Check if referral code is valid (if provided)
    let invitedBy = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        invitedBy = referrer.id;
        // Give points to referrer
        await prisma.user.update({
          where: { id: referrer.id },
          data: { points: { increment: 50 } },
        });
        await prisma.pointTransaction.create({
          data: {
            userId: referrer.id,
            type: "invite",
            points: 50,
          },
        });
      }
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        referralCode: userReferralCode,
        invitedBy,
        points: invitedBy ? 25 : 0, // Give bonus points if referred
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Give signup bonus points
    if (invitedBy) {
      await prisma.pointTransaction.create({
        data: {
          userId: user.id,
          type: "bonus",
          points: 25,
        },
      });
    }

    return new Response(JSON.stringify({ success: true, user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Failed to create account" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

