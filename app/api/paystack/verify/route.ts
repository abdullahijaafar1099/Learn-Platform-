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

    const userEmail = userData.user.email.trim().toLowerCase();

    const reference = new URL(request.url).searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
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
        { error: data.message || "Verification failed" },
        { status: 400 }
      );
    }

    const transaction = data.data;

    if (transaction.status !== "success") {
      return NextResponse.json({
        status: transaction.status,
        reference: transaction.reference,
        amount: transaction.amount,
        currency: transaction.currency,
      });
    }

    const transactionEmail =
      transaction.customer?.email?.trim().toLowerCase() || "";

    if (!transactionEmail || transactionEmail !== userEmail) {
      return NextResponse.json(
        { error: "Payment does not belong to this account" },
        { status: 403 }
      );
    }

    const expectedAmount =
      transaction.currency === "NGN" ? 200000 : 300;

    if (Number(transaction.amount) !== expectedAmount) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const expectedCurrency =
      transaction.currency === "NGN" ? "NGN" : "USD";

    if (transaction.currency !== expectedCurrency) {
      return NextResponse.json(
        { error: "Invalid payment currency" },
        { status: 400 }
      );
    }

    const payment = {
      email: userEmail,
      reference: transaction.reference,
      amount: transaction.amount,
      currency: transaction.currency,
      status: "success",
    };

    const { data: savedPayment, error } = await supabase
      .from("payments")
      .upsert([payment], { onConflict: "reference" })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: "Unable to save verified payment",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      saved: savedPayment,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to verify payment" },
      { status: 500 }
    );
  }
}
