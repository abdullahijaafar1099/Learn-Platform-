"use client";

import { useEffect, useState } from "react";

export default function LearningPage() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("poultrywise_access") === "granted") setAllowed(true);
    else window.location.href = "/access";
  }, []);

  if (!allowed) return null;
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="text-5xl">🐔</div>
          <h1 className="mt-4 text-3xl font-extrabold text-green-800">
            PoultryWise Learning
          </h1>
          <p className="mt-3 text-gray-600">
            Your poultry farming learning resources.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <a
            href="/courses"
            className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl"
          >
            <div className="text-4xl">🎓</div>
            <h2 className="mt-4 text-xl font-bold">Poultry Courses</h2>
            <p className="mt-2 text-gray-600">
              Access practical poultry farming courses.
            </p>
          </a>

          <a
            href="/books"
            className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl"
          >
            <div className="text-4xl">📚</div>
            <h2 className="mt-4 text-xl font-bold">Books & Guides</h2>
            <p className="mt-2 text-gray-600">
              Read poultry farming books and practical guides.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
