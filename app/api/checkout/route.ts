import Stripe from "stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
  const { priceId, points, userId, successUrl, cancelUrl } = await req.json();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { userId, points: String(points) },
  });
  return Response.json({ id: session.id, url: session.url });
}

