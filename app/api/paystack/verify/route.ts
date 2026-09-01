import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference) return NextResponse.json({ error: "Reference is required" }, { status: 400 });
  const response = await fetch("https://api.paystack.co/transaction/verify/" + reference, {
    headers: { Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY },
  });
  const data = await response.json();
  if (!response.ok || !data.status) return NextResponse.json({ error: data.message || "Verification failed" }, { status: 400 });
  if (data.data.status === "success") {
    const { error } = await supabase.from("payments").upsert([{ email: data.data.customer?.email, reference: data.data.reference, amount: data.data.amount, currency: data.data.currency, status: data.data.status }], { onConflict: "reference" });
    if (error) return NextResponse.json({ error: error.message, details: error.details, hint: error.hint, code: error.code }, { status: 500 });
  }

  return NextResponse.json({ status: data.data.status, reference: data.data.reference, amount: data.data.amount, currency: data.data.currency, email: data.data.customer?.email });
}
