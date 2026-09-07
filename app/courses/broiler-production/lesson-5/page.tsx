"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonFivePage() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("lesson-5-completed") === "true");
  }, []);

  function markComplete() {
    localStorage.setItem("lesson-5-completed", "true");
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
            Lesson 5: Health Management and Disease Prevention
          </h1>

          <p className="mt-4 text-green-50">
            Learn practical ways to keep your broiler flock healthy and
            reduce disease risks.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Health Management Matters
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Healthy birds grow efficiently and are less likely to suffer
            production losses. Good health management combines prevention,
            observation, hygiene, appropriate vaccination programs, and early
            response to signs of illness.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Common Prevention Practices
          </h2>

          <ul className="mt-5 space-y-3 text-gray-700">
            <li>🧹 Keep poultry houses and equipment clean</li>
            <li>🚪 Control unnecessary visitors and farm traffic</li>
            <li>👟 Use appropriate biosecurity procedures</li>
            <li>💧 Provide clean water and good-quality feed</li>
            <li>🐔 Observe birds daily for unusual behaviour</li>
            <li>💉 Follow a vaccination program appropriate for your area</li>
            <li>📋 Keep accurate health and treatment records</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">
            Recognising Warning Signs
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Farmers should regularly observe the flock for changes in feeding,
            drinking, activity, droppings, breathing, growth, or mortality.
            Unusual signs should be investigated promptly with help from a
            qualified veterinarian or poultry health professional.
          </p>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              By the end of this lesson, you should understand the basic
              principles of poultry health management, disease prevention,
              biosecurity, observation, and responsible veterinary support.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-4"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Lesson 4
            </Link>

            <button
              type="button"
              onClick={markComplete}
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
            </button>

            <Link
              href="/courses/broiler-production/lesson-6"
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
