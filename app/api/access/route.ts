import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ allowed: false }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return NextResponse.json({ allowed: false }, { status: 401 });
  }

  const email = data.user.email?.trim().toLowerCase() || "";
  const adminEmail =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase() || "";

  if (email && adminEmail && email === adminEmail) {
    return NextResponse.json({
      allowed: true,
      role: "admin",
    });
  }

  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .select("id, email, status")
    .eq("email", email)
    .eq("status", "success")
    .limit(1)
    .maybeSingle();

  if (paymentError) {
    return NextResponse.json(
      {
        allowed: false,
        role: "error",
        reason: "payment_query_error",
        message: paymentError.message,
      },
      { status: 500 }
    );
  }

  if (payment) {
    return NextResponse.json({
      allowed: true,
      role: "paid_user",
    });
  }

  return NextResponse.json({
    allowed: false,
    role: "user",
  });
}
