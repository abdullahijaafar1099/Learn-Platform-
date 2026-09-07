"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BroilerProductionPage() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        window.location.href = "/auth";
        return;
      }

      const response = await fetch("/api/access", {
        headers: {
          Authorization: "Bearer " + session.access_token,
        },
      });

      const access = await response.json();

      if (!access.allowed) {
        window.location.href = "/access";
        return;
      }

      setAllowed(true);
    }

    checkAccess();
  }, []);

  if (!allowed) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-5xl">🐔</div>

          <h1 className="mt-4 text-3xl font-extrabold text-green-800">
            Broiler Production
          </h1>

          <p className="mt-4 text-gray-600">
            Learn broiler management, feeding, health, and production.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Course Lessons</h2>

            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((lesson) => (
                <a
                  key={lesson}
                  href={`/courses/broiler-production/lesson-${lesson}`}
                  className="block rounded-xl border bg-white p-5 font-bold text-green-800 shadow-sm"
                >
                  Lesson {lesson} →
                </a>
              ))}
            </div>
          </div>

          <a
            href="/courses"
            className="mt-8 inline-block rounded-xl bg-green-600 px-5 py-3 font-bold text-white"
          >
            ← Back to Courses
          </a>
        </div>
      </div>
    </main>
  );
}
