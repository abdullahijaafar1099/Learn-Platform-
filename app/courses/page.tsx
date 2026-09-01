"use client";

import { useEffect, useState } from "react";

export default function CoursesPage() {
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
          <div className="text-5xl">🎓</div>

          <h1 className="mt-4 text-3xl font-extrabold text-green-800">
            PoultryWise Courses
          </h1>

          <p className="mt-3 text-gray-600">
            Practical poultry farming courses to help you learn and grow.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-3xl">🐔</div>
            <h2 className="mt-4 text-xl font-bold">Broiler Production</h2>
            <p className="mt-2 text-gray-600">
              Learn broiler management, feeding, health, and production.
            </p>
            <button className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-bold text-white">
              Start Course
            </button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-3xl">🥚</div>
            <h2 className="mt-4 text-xl font-bold">Layer Farming</h2>
            <p className="mt-2 text-gray-600">
              Learn layer management and improve egg production.
            </p>
            <button className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-bold text-white">
              Start Course
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
