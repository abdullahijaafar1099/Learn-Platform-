"use client";

import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import { supabase } from "@/lib/supabase";

type Book = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdfName: string;
  pdfUrl: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [message, setMessage] = useState("");

  async function getToken() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      window.location.href = "/admin/login";
      return null;
    }

    const { data: userData } = await supabase.auth.getUser();
    const email = userData.user?.email?.trim().toLowerCase() || "";
    const adminEmail =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase() || "";

    if (!email || email !== adminEmail) {
      await supabase.auth.signOut();
      window.location.href = "/admin/login";
      return null;
    }

    return data.session.access_token;
  }

  async function loadBooks() {
    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch("/api/admin/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        setMessage("❌ Admin access required.");
        return;
      }

      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch {
      setMessage("❌ Unable to load books.");
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function deleteBook(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch("/api/admin/books", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Book deleted successfully.");
        await loadBooks();
      } else {
        setMessage(`❌ ${data.message || "Delete failed."}`);
      }
    } catch {
      setMessage("❌ Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Books Management
        </h1>

        <p className="mb-8 text-gray-600">
          Add and manage books for the PoultryWise library.
        </p>

        <BookForm />

        {message && (
          <div className="mt-6 rounded-xl bg-white p-4 font-medium shadow-sm">
            {message}
          </div>
        )}

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Uploaded Books
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {books.length} books
            </span>
          </div>

          <div className="grid gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {book.category}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    {book.description}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      const token = await getToken();

                      if (!token) return;

                      const response = await fetch(book.pdfUrl, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });

                      if (!response.ok) {
                        setMessage("❌ Unable to open PDF.");
                        return;
                      }

                      const blob = await response.blob();
                      const url = URL.createObjectURL(blob);
                      window.open(url, "_blank", "noopener,noreferrer");

                      setTimeout(() => URL.revokeObjectURL(url), 60000);
                    }}
                    className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    📖 View
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteBook(book.id)}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}

            {books.length === 0 && (
              <div className="rounded-2xl bg-white p-8 text-center text-gray-500">
                No books uploaded yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
