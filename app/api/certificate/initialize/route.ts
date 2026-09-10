import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
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

    const body = await request.json().catch(() => ({}));
    const country = body?.country === "NG" ? "NG" : "OTHER";
    const isNigeria = country === "NG";

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: isNigeria ? 150000 : 200,
          currency: isNigeria ? "NGN" : "USD",
          callback_url:
            (process.env.NEXT_PUBLIC_SITE_URL ||
              "http://localhost:3000") + "/payment/callback?type=certificate",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          error: data.message || "Certificate payment initialization failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Certificate payment initialization failed" },
      { status: 500 }
    );
  }
}
