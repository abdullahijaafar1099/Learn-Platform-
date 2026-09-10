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

    const { data: premiumPayment } = await supabase
      .from("payments")
      .select("id")
      .eq("email", email)
      .eq("status", "success")
      .limit(1)
      .maybeSingle();

    if (!premiumPayment) {
      return NextResponse.json(
        { error: "Premium access is required before purchasing a certificate." },
        { status: 403 }
      );
    }

    const reference = new URL(request.url).searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "Payment reference is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/verify/" +
        encodeURIComponent(reference),
      {
        headers: {
          Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status || !data.data) {
      return NextResponse.json(
        { error: data.message || "Payment verification failed" },
        { status: 400 }
      );
    }

    const transaction = data.data;

    if (transaction.status !== "success") {
      return NextResponse.json(
        { error: "Certificate payment was not successful" },
        { status: 400 }
      );
    }

    if (transaction.customer?.email?.trim().toLowerCase() !== email) {
      return NextResponse.json(
        { error: "Payment email does not match your account" },
        { status: 403 }
      );
    }

    const expectedAmount =
      transaction.currency === "NGN"
        ? 150000
        : transaction.currency === "USD"
          ? 200
          : 0;

    if (!expectedAmount || Number(transaction.amount) !== expectedAmount) {
      return NextResponse.json(
        { error: "Invalid certificate payment amount" },
        { status: 400 }
      );
    }

    const { error: saveError } = await supabase
      .from("certificate_payments")
      .upsert(
        {
          email,
          reference,
          amount: transaction.amount,
          currency: transaction.currency,
          status: "success",
        },
        { onConflict: "reference" }
      );

    if (saveError) {
      return NextResponse.json(
        { error: "Payment verified but could not be saved" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Certificate payment verified successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Certificate payment verification failed" },
      { status: 500 }
    );
  }
}
