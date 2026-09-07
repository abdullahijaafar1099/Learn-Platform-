import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";
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
    debugEmail: email,
    debugAdminEmail: adminEmail,
  };
}

export async function GET(request: Request) {
  const access = await checkAccess(request);

  if (!access.allowed) {
    return NextResponse.json(
      { success: false, message: "Payment required" },
      { status: 403 }
    );
  }

  try {
    const file = path.join(process.cwd(), "data", "books.json");
    const data = await readFile(file, "utf8");

    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const access = await checkAccess(request);

  if (!access.admin) {
    return NextResponse.json(
      { success: false, message: "Admin access required" },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const pdf = formData.get("pdf");

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Book title is required" },
        { status: 400 }
      );
    }

    if (!(pdf instanceof File) || pdf.size === 0) {
      return NextResponse.json(
        { success: false, message: "PDF is required" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "data",
      "books"
    );

    const dataDir = path.join(process.cwd(), "data");

    await mkdir(uploadDir, { recursive: true });
    await mkdir(dataDir, { recursive: true });

    const safeName = pdf.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    const bytes = await pdf.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    const booksFile = path.join(dataDir, "books.json");

    let books: any[] = [];

    try {
      books = JSON.parse(await readFile(booksFile, "utf8"));
    } catch {
      books = [];
    }

    const book = {
      id: Date.now().toString(),
      title: title.trim(),
      description:
        typeof description === "string" ? description.trim() : "",
      category:
        typeof category === "string" && category.trim()
          ? category.trim()
          : "Poultry Farming",
      pdfName: pdf.name,
      pdfUrl: `/api/books/pdf/${fileName}`,
    };

    books.push(book);

    await writeFile(
      booksFile,
      JSON.stringify(books, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      message: "Book and PDF uploaded successfully",
      book,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to upload book" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const access = await checkAccess(request);

  if (!access.admin) {
    return NextResponse.json(
      { success: false, message: "Admin access required" },
      { status: 403 }
    );
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Book ID is required" },
        { status: 400 }
      );
    }

    const booksFile = path.join(process.cwd(), "data", "books.json");
    const data = await readFile(booksFile, "utf8");
    const books = JSON.parse(data);

    const book = books.find(
      (item: { id: string }) => item.id === id
    );

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    const updatedBooks = books.filter(
      (item: { id: string }) => item.id !== id
    );

    await writeFile(
      booksFile,
      JSON.stringify(updatedBooks, null, 2),
      "utf8"
    );

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete book" },
      { status: 500 }
    );
  }
}
