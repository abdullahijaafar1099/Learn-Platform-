import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const file = path.join(process.cwd(), "data", "books.json");
    const data = await readFile(file, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const pdf = formData.get("pdf");

    if (!(pdf instanceof File) || pdf.size === 0) {
      return NextResponse.json(
        { success: false, message: "PDF is required" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
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

    let books = [];

    try {
      books = JSON.parse(await readFile(booksFile, "utf8"));
    } catch {
      books = [];
    }

    const book = {
      id: Date.now().toString(),
      title,
      description,
      category,
      pdfName: pdf.name,
      pdfUrl: `/uploads/books/${fileName}`,
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

    const book = books.find((item: { id: string }) => item.id === id);

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
