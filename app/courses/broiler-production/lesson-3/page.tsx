"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonThreePage() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("broiler-lesson-3-completed") === "true");
  }, []);

  function markComplete() {
    localStorage.setItem("broiler-lesson-3-completed", "true");
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
            Lesson 3: Feed and Nutrition Management
          </h1>

          <p className="mt-4 text-green-50">
            Understand feeding practices that support healthy growth and good
            broiler performance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Nutrition Matters
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Good nutrition is essential for healthy growth, strong immunity,
            efficient feed use, and good meat production. Broilers need a
            balanced diet containing energy, protein, vitamins, minerals, and
            other essential nutrients.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Important Feeding Practices
          </h2>

          <ul className="mt-5 space-y-3 text-gray-700">
            <li>🌾 Provide feed appropriate for the birds' growth stage</li>
            <li>🥣 Keep feeders clean and accessible</li>
            <li>💧 Make clean drinking water available at all times</li>
            <li>📦 Store feed in a clean, dry and protected location</li>
            <li>📊 Monitor feed consumption regularly</li>
            <li>⚖️ Track body weight and growth performance</li>
            <li>🚫 Avoid spoiled, contaminated or mouldy feed</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">
            Feed Phases
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Broiler feeding programs commonly use different diets as birds
            grow. Starter feed supports early development, while grower and
            finisher diets are formulated for later growth and production.
            Follow the recommendations of a qualified poultry nutritionist or
            the feed manufacturer's instructions.
          </p>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              By the end of this lesson, you should understand the importance
              of balanced nutrition, proper feeding practices, clean water,
              feed storage, and monitoring broiler growth.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-2"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Lesson 2
            </Link>

            <button
              type="button"
              onClick={markComplete}
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
            </button>

            <Link
              href="/courses/broiler-production/lesson-4"
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
