"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        className="rounded-lg border border-gray-200 px-3 py-2 text-xl text-gray-700"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[73px] z-50 border-b bg-white px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-semibold text-gray-700 hover:text-green-700"
            >
              Home
            </Link>

            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="font-semibold text-gray-700 hover:text-green-700"
            >
              Courses
            </Link>

            <Link
              href="/books"
              onClick={() => setOpen(false)}
              className="font-semibold text-gray-700 hover:text-green-700"
            >
              Books
            </Link>

            <Link
              href="/certificate"
              onClick={() => setOpen(false)}
              className="font-semibold text-gray-700 hover:text-green-700"
            >
              Certificate
            </Link>

            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className="font-semibold text-gray-700 hover:text-green-700"
            >
              Consultation
            </Link>

            <Link
              href="/auth"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-green-600 px-5 py-3 text-center font-bold text-white hover:bg-green-700"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
