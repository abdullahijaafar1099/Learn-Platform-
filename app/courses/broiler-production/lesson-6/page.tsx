"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonSixPage() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("broiler-lesson-6-completed") === "true");
  }, []);

  function markComplete() {
    localStorage.setItem("broiler-lesson-6-completed", "true");
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
            Lesson 6: Farm Records and Performance Monitoring
          </h1>

          <p className="mt-4 text-green-50">
            Learn how proper record keeping can help you understand farm
            performance and make better decisions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Farm Records Matter
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Accurate records help farmers understand what is happening on the
            farm. They can be used to monitor growth, feed use, mortality,
            medication, expenses, sales, and overall flock performance.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Important Records to Keep
          </h2>

          <ul className="mt-5 space-y-3 text-gray-700">
            <li>🐣 Number of chicks received</li>
            <li>🐔 Daily and cumulative mortality</li>
            <li>🌾 Feed purchased and consumed</li>
            <li>💧 Water consumption observations</li>
            <li>⚖️ Bird weights and growth performance</li>
            <li>💊 Vaccination and treatment records</li>
            <li>💰 Farm expenses and sales</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">
            Monitoring Farm Performance
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Regular monitoring allows farmers to identify problems early and
            evaluate whether management practices are working. Comparing feed
            use, mortality, growth, expenses, and sales over different batches
            can provide useful information for future planning.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Making Better Farm Decisions
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Good records turn daily farm activities into useful information.
            Farmers can use this information to identify unnecessary costs,
            improve management practices, plan future production, and evaluate
            profitability.
          </p>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              By the end of this lesson, you should understand the importance
              of farm records, performance monitoring, cost tracking, and using
              farm information to support better production decisions.
            </p>
          </div>

          {completed && (
            <div className="mt-8 rounded-xl bg-green-100 p-5 text-center">
              <div className="text-4xl">🏆</div>
              <h3 className="mt-2 text-xl font-extrabold text-green-800">
                Course Completed!
              </h3>
              <p className="mt-2 text-green-700">
                Congratulations! You have completed the Broiler Production
                course.
              </p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-5"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Lesson 5
            </Link>

            <button
              type="button"
              onClick={markComplete}
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              {completed ? "Course Completed ✓" : "Mark Lesson Complete ✓"}
            </button>

            <Link
              href="/courses/broiler-production"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Back to Course →
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
