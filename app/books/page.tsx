"use client";

import { useEffect, useMemo, useState } from "react";

type Book = {
  id: string;
  title: string;
  description: string;
  category: string;
  pdfName: string;
  pdfUrl: string;
};

export default function BooksPage() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("poultrywise_access") === "granted") setAllowed(true);
    else window.location.href = "/access";
  }, []);

  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch("/api/admin/books");
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(books.map((book) => book.category)))],
    [books]
  );

  const filteredBooks = useMemo(() => {
    const text = search.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(text) ||
        book.description.toLowerCase().includes(text) ||
        book.category.toLowerCase().includes(text);

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  if (!allowed) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-700 to-green-500 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider">
            PoultryWise Learning
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">
            Books Library
          </h1>
          <p className="mt-3 max-w-2xl text-green-50">
            Explore our collection of useful books, guides, and learning
            materials.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search books
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="w-full md:w-64">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-gray-600">Loading books...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">📚</div>
            <h2 className="text-xl font-bold text-gray-800">
              No books found
            </h2>
            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Available Books
              </h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {filteredBooks.length} books
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <article
                  key={book.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-green-700 to-green-400 text-white">
                    <div className="text-center">
                      <div className="mb-3 text-6xl">📚</div>
                      <p className="px-6 text-lg font-bold">
                        {book.title}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {book.category}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-gray-900">
                      {book.title}
                    </h3>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-600">
                      {book.description}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <a
                        href={book.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
                      >
                        📖 Read PDF
                      </a>

                      <a
                        href={book.pdfUrl}
                        download
                        className="rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        ⬇️
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
