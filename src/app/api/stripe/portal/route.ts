import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = any;

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: userRow } = await (supabase as AnyClient)
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!userRow?.stripe_customer_id) {
    return NextResponse.json({ error: "No subscription found" }, { status: 404 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: userRow.stripe_customer_id,
    return_url: `${origin}/plans`,
  });

  return NextResponse.json({ url: portalSession.url });
}
