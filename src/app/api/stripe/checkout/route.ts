import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const PRICE_IDS: Record<string, string> = {
    standard: process.env.STRIPE_PRICE_STANDARD!,
    premium: process.env.STRIPE_PRICE_PREMIUM!,
  };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { plan } = await req.json();
  if (!plan || !PRICE_IDS[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  // 既存の stripe_customer_id を取得
  const { data: userRow } = await (supabase as AnyClient)
    .from("users")
    .select("stripe_customer_id, display_name")
    .eq("id", user.id)
    .maybeSingle();

  let customerId = userRow?.stripe_customer_id as string | undefined;

  // Stripe顧客が存在しない場合は作成
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: userRow?.display_name ?? undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    await (supabase as AnyClient)
      .from("users")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
    success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/plans`,
    metadata: { supabase_user_id: user.id, plan },
    subscription_data: {
      metadata: { supabase_user_id: user.id, plan },
    },
  });

  return NextResponse.json({ url: session.url });
}
