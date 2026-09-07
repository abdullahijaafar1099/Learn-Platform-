import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAccess(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return { allowed: false, admin: false };
  }

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return { allowed: false, admin: false };
  }

  const email = data.user.email?.trim().toLowerCase() || "";
  const adminEmail =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase() || "";

  if (email && adminEmail && email === adminEmail) {
    return { allowed: true, admin: true };
  }

  const { data: payment } = await supabase
    .from("payments")
    .select("id")
    .eq("email", email)
    .eq("status", "success")
    .limit(1)
    .maybeSingle();

  return {
    allowed: !!payment,
    admin: false,
  };
}

export async function GET(request: Request) {
  const access = await checkAccess(request);

  if (!access.allowed) {
    return NextResponse.json(
      { success: false, error: "Payment required" },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const access = await checkAccess(request);

  if (!access.admin) {
    return NextResponse.json(
      { success: false, error: "Admin access required" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Course title is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("courses")
      .insert({
        title: body.title,
        description: body.description || "",
        category: body.category || "Poultry Farming",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, course: data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const access = await checkAccess(request);

  if (!access.admin) {
    return NextResponse.json(
      { success: false, error: "Admin access required" },
      { status: 403 }
    );
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Course ID is required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
