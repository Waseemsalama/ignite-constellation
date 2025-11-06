import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const sig = (await headers()).get("stripe-signature")!;
  const raw = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId!;
    const points = parseInt(session.metadata?.points || "0", 10);
    if (userId && points > 0) {
      await prisma.pointTransaction.create({ data: { userId, type: "purchase", points } });
      await prisma.user.update({ where: { id: userId }, data: { points: { increment: points } } });
    }
  }
  return new Response("ok");
}

