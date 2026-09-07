import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAccess(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return { allowed: false, admin: false };
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = authHeader ? await supabase.auth.getUser(token) : { data: null, error: null  };
  if (error || !data.user) return { allowed: false, admin: false };
  const email = data.user.email?.trim().toLowerCase() || "";
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase() || "";
  if (email && adminEmail && email === adminEmail) return { allowed: true, admin: true };
  const { data: payment } = await supabase.from("payments").select("id").eq("email", email).eq("status", "success").limit(1).maybeSingle();
  return { allowed: !!payment, admin: false };
}

export async function GET(request: Request) {
  const access = await checkAccess(request);
  if (!access.allowed) return NextResponse.json( { success: false, error: "Payment required" }, { status: 403 });
  const { data, error } = await supabase.from("lessons").select("*").order("lesson_order", { ascending: true });
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const access = await checkAccess(request);
  if (!access.admin) return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 });
  const body = await request.json();
  if (!body.course_id || !body.title) return NextResponse.json( { success: false, error: "Course and lesson title are required" }, { status: 400 });
  const { data, error } = await supabase.from("lessons").insert({ course_id: body.course_id, title: body.title, content: body.content || "", lesson_order: body.lesson_order || 1 }).select().single();
  if (error) return NextResponse.json( { success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, lesson: data });
}

export async function DELETE(request: Request) {
  const access = await checkAccess(request);
  if (!access.admin) return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 });
  const { id } = await request.json();
  if (!id) return NextResponse.json({ success: false, error: "Lesson ID is required" }, { status: 400 });
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) return NextResponse.json( { success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}