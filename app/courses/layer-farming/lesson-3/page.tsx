"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonThree() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("layer-lesson-3-completed") === "true");
  }, []);

  const complete = () => {
    localStorage.setItem("layer-lesson-3-completed", "true");
    setCompleted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <p className="font-bold text-yellow-600">Layer Farming</p>
        <h1 className="mt-3 text-3xl font-extrabold">Lesson 3: Feed & Nutrition</h1>
        <p className="mt-4 leading-8 text-gray-600">
          Balanced nutrition supports healthy growth, strong eggshells,
          good egg production, and overall flock performance.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Key Areas</h2>
        <ul className="mt-4 space-y-3">
          <li>🌾 Use quality balanced feed</li>
          <li>🥚 Provide adequate calcium</li>
          <li>💧 Ensure clean water</li>
          <li>📅 Feed according to production stage</li>
          <li>📊 Monitor feed consumption</li>
          <li>🧪 Store feed properly</li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/courses/layer-farming/lesson-2" className="rounded-xl border px-6 py-3 font-bold">← Previous</Link>
          <button onClick={complete} className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white">
            {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
          </button>
          <Link href="/courses/layer-farming/lesson-4" className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">
            Next Lesson →
          </Link>
        </div>
      </div>
    </main>
  );
}
