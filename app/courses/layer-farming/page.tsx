"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const lessons = [
  ["1", "Introduction to Layer Farming", "Understand the basics of successful egg production."],
  ["2", "Chick & Pullet Management", "Learn proper management from chick to laying stage."],
  ["3", "Feed & Nutrition", "Understand nutrition requirements for healthy layers."],
  ["4", "Health & Disease Prevention", "Learn basic health management and disease prevention."],
  ["5", "Housing & Biosecurity", "Learn proper housing, hygiene, and biosecurity practices."],
  ["6", "Egg Production & Farm Records", "Learn egg collection, production monitoring, and record keeping."],
];

export default function LayerFarmingPage() {
  const [allowed, setAllowed] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("poultrywise_access") !== "granted") {
      window.location.href = "/access";
      return;
    }

    setAllowed(true);

    let count = 0;
    for (let i = 1; i <= 6; i++) {
      if (localStorage.getItem(`layer-lesson-${i}-completed`) === "true") {
        count++;
      }
    }

    setCompleted(count);
  }, []);

  if (!allowed) return null;

  const progress = Math.round((completed / 6) * 100);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-700 to-yellow-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            PoultryWise Course
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            🥚 Layer Farming
          </h1>

          <p className="mt-4 max-w-2xl">
            Learn practical layer management and improve egg production,
            flock health, and farm performance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">

        <div className="rounded-2xl bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Course Progress</h2>
              <p className="mt-2 text-gray-600">
                {completed}/6 lessons completed
              </p>
            </div>

            <div className="text-3xl font-extrabold text-yellow-700">
              {progress}%
            </div>
          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-yellow-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {completed === 6 && (
            <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-center font-bold text-yellow-800">
              🏆 Congratulations! You completed the Layer Farming course.
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">Course Overview</h2>

          <p className="mt-4 leading-7 text-gray-600">
            This course covers layer management from chick development
            through egg production, including feeding, health, housing,
            biosecurity, egg collection, and farm records.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Course Lessons</h2>

          <div className="mt-5 space-y-4">
            {lessons.map(([id, title, description]) => (
              <div
                key={id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-yellow-700">
                  LESSON {id}
                </p>

                <h3 className="mt-1 text-xl font-bold">{title}</h3>

                <p className="mt-2 text-gray-600">{description}</p>

                <Link
                  href={`/courses/layer-farming/lesson-${id}`}
                  className="mt-4 inline-block rounded-xl bg-yellow-600 px-5 py-3 font-bold text-white hover:bg-yellow-700"
                >
                  {completed >= Number(id) ? "Review Lesson →" : `Start Lesson →`}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/courses"
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700"
          >
            ← All Courses
          </Link>

          <Link
            href="/learning"
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700"
          >
            Learning Dashboard
          </Link>
        </div>

      </section>
    </main>
  );
}
