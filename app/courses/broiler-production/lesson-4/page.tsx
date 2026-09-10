"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonFourPage() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("broiler-lesson-4-completed") === "true");
  }, []);

  function markComplete() {
    localStorage.setItem("broiler-lesson-4-completed", "true");
    setCompleted(true);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Broiler Production
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Lesson 4: Water and Environmental Management
          </h1>

          <p className="mt-4 text-green-50">
            Learn how water quality, temperature, ventilation, and comfort
            affect broiler performance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            The Importance of Clean Water
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Water is one of the most important nutrients for broiler chickens.
            Birds should have continuous access to clean, safe drinking water.
            Poor water quality or restricted access can reduce feed intake,
            growth, and overall flock performance.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Environmental Management
          </h2>

          <ul className="mt-5 space-y-3 text-gray-700">
            <li>💧 Provide clean drinking water at all times</li>
            <li>🌡️ Monitor temperature regularly</li>
            <li>🌬️ Maintain adequate ventilation</li>
            <li>🏠 Prevent excessive heat, cold, and drafts</li>
            <li>🧹 Keep litter dry and manage moisture</li>
            <li>🐔 Avoid overcrowding</li>
            <li>👀 Observe bird behaviour for signs of discomfort</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">
            Ventilation and Litter Management
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Good ventilation helps control heat, humidity, dust, and harmful
            gases inside the poultry house. Litter should be kept clean and
            reasonably dry because wet litter can contribute to poor air
            quality, foot problems, and disease risks.
          </p>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              By the end of this lesson, you should understand the importance
              of clean water, proper ventilation, temperature management,
              litter quality, and bird comfort.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-3"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Lesson 3
            </Link>

            <button
              type="button"
              onClick={markComplete}
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
            </button>

            <Link
              href="/courses/broiler-production/lesson-5"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Next Lesson →
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
