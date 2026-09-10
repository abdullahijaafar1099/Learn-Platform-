"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SiteNav() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoggedIn(!!session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-extrabold text-green-800">
          🐔 PoultryWise
        </Link>

        <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          <Link href="/courses" className="hover:text-green-600">
            Courses
          </Link>

          <Link href="/books" className="hover:text-green-600">
            Books
          </Link>

          <Link href="/certificate" className="hover:text-green-600">
            Certificate
          </Link>

          <Link href="/certificate" className="hover:text-green-600">
            Certificate
          </Link>

          <Link href="/consultation" className="hover:text-green-600">
            Consultation
          </Link>

          {loggedIn ? (
            <button
              onClick={logout}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
