import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, country = "NG" } = await request.json();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
  const isNigeria = country === "NG";
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.PAYSTACK_SECRET_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: isNigeria ? 150000 : 200,
      currency: isNigeria ? "NGN" : "USD",
      callback_url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/payment/callback",
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.status) return NextResponse.json({ error: data.message || "Payment initialization failed" }, { status: 500 });
  return NextResponse.json({ authorization_url: data.data.authorization_url, reference: data.data.reference });
}
