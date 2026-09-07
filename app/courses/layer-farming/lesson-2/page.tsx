"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonTwo() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("layer-lesson-2-completed") === "true");
  }, []);

  const complete = () => {
    localStorage.setItem("layer-lesson-2-completed", "true");
    setCompleted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <p className="font-bold text-yellow-600">Layer Farming</p>
        <h1 className="mt-3 text-3xl font-extrabold">Lesson 2: Chick & Pullet Management</h1>
        <p className="mt-4 leading-8 text-gray-600">
          Proper management during the chick and pullet stages prepares birds
          for healthy growth and future egg production.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Key Areas</h2>
        <ul className="mt-4 space-y-3">
          <li>🐣 Select healthy chicks</li>
          <li>🌡️ Maintain suitable brooding conditions</li>
          <li>💧 Provide clean water</li>
          <li>🌾 Provide quality starter and grower feed</li>
          <li>⚖️ Monitor body weight and growth</li>
          <li>🧹 Keep housing clean</li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/courses/layer-farming/lesson-1" className="rounded-xl border px-6 py-3 font-bold">← Previous</Link>
          <button onClick={complete} className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white">
            {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
          </button>
          <Link href="/courses/layer-farming/lesson-3" className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">
            Next Lesson →
          </Link>
        </div>
      </div>
    </main>
  );
}
