import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkAccess(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return false;
  }

  const email = data.user.email?.trim().toLowerCase() || "";
  const adminEmail =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase() || "";

  if (email && adminEmail && email === adminEmail) {
    return true;
  }

  const { data: payment } = await supabase
    .from("payments")
    .select("id")
    .eq("email", email)
    .eq("status", "success")
    .limit(1)
    .maybeSingle();

  return !!payment;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const allowed = await checkAccess(request);

  if (!allowed) {
    return NextResponse.json(
      { success: false, message: "Payment required" },
      { status: 403 }
    );
  }

  try {
    const { filename } = await context.params;

    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid file name" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "books", filename);
    const file = await readFile(filePath);

    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "PDF not found" },
      { status: 404 }
    );
  }
}
