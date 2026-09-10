"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonTwoPage() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("broiler-lesson-2-completed") === "true");
  }, []);

  function markComplete() {
    localStorage.setItem("broiler-lesson-2-completed", "true");
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
            Lesson 2: Chick Preparation and Brooding
          </h1>

          <p className="mt-4 text-green-50">
            Learn how to prepare your brooder and give chicks a strong start.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Preparing for Day-Old Chicks
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Good brooding begins before the chicks arrive. The brooder should
            be clean, dry, warm, well ventilated, and protected from drafts.
            Feeders and drinkers should be cleaned and positioned so that
            chicks can easily reach them.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Important Brooding Practices
          </h2>

          <ul className="mt-5 space-y-3 text-gray-700">
            <li>🔥 Provide suitable warmth before chicks arrive</li>
            <li>🧹 Clean and disinfect the brooding area</li>
            <li>💧 Provide clean drinking water immediately</li>
            <li>🌾 Provide appropriate starter feed</li>
            <li>🌬️ Maintain good ventilation without cold drafts</li>
            <li>🐣 Observe chick activity and behaviour regularly</li>
            <li>📊 Monitor temperature, mortality, feed and water intake</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">
            Understanding Chick Behaviour
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Chicks can provide useful signs about their environment. If they
            crowd together, they may be too cold. If they move far away from
            the heat source and appear uncomfortable, they may be too warm.
            Even distribution and active behaviour generally indicate that the
            brooding environment is more comfortable.
          </p>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              By the end of this lesson, you should understand how to prepare
              a brooding area, provide basic chick needs, and observe chicks
              for signs of environmental problems.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-1"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Lesson 1
            </Link>

            <button
              type="button"
              onClick={markComplete}
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
            </button>

            <Link
              href="/courses/broiler-production/lesson-3"
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
