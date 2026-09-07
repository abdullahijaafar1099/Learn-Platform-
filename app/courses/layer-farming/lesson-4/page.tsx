"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonFour() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("layer-lesson-4-completed") === "true");
  }, []);

  const complete = () => {
    localStorage.setItem("layer-lesson-4-completed", "true");
    setCompleted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <p className="font-bold text-yellow-600">Layer Farming</p>
        <h1 className="mt-3 text-3xl font-extrabold">Lesson 4: Health & Disease Prevention</h1>
        <p className="mt-4 leading-8 text-gray-600">
          Prevention is essential in poultry farming. Daily observation,
          hygiene, vaccination, biosecurity, and early response help protect the flock.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Key Areas</h2>
        <ul className="mt-4 space-y-3">
          <li>💊 Follow an appropriate vaccination program</li>
          <li>👀 Observe birds every day</li>
          <li>🧹 Maintain farm hygiene</li>
          <li>🚪 Control visitors</li>
          <li>💧 Keep water clean</li>
          <li>⚠️ Respond quickly to signs of illness</li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/courses/layer-farming/lesson-3" className="rounded-xl border px-6 py-3 font-bold">← Previous</Link>
          <button onClick={complete} className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white">
            {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
          </button>
          <Link href="/courses/layer-farming/lesson-5" className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">
            Next Lesson →
          </Link>
        </div>
      </div>
    </main>
  );
}
