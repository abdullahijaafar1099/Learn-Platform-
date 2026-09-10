import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData.user?.email) {
      return NextResponse.json(
        { error: "Invalid authentication session" },
        { status: 401 }
      );
    }

    const email = userData.user.email.trim().toLowerCase();

    const { data: payment, error: paymentError } = await supabase
      .from("certificate_payments")
      .select("reference, amount, currency, status, created_at")
      .eq("email", email)
      .eq("status", "success")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (paymentError) {
      return NextResponse.json(
        { error: "Could not check certificate payment" },
        { status: 500 }
      );
    }

    if (!payment) {
      return NextResponse.json({
        paid: false,
      });
    }

    const certificateId =
      "PW-" + payment.reference.slice(-10).toUpperCase();

    return NextResponse.json({
      paid: true,
      certificateId,
      paymentDate: payment.created_at,
      currency: payment.currency,
      amount: payment.amount,
    });
  } catch {
    return NextResponse.json(
      { error: "Certificate status check failed" },
      { status: 500 }
    );
  }
}
