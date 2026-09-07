"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonOne() {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("layer-lesson-1-completed") === "true");
  }, []);

  const complete = () => {
    localStorage.setItem("layer-lesson-1-completed", "true");
    setCompleted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
        <p className="font-bold text-yellow-600">Layer Farming</p>
        <h1 className="mt-3 text-3xl font-extrabold">Lesson 1: Introduction to Layer Farming</h1>
        <p className="mt-4 leading-8 text-gray-600">
          Layer farming is the rearing of chickens mainly for egg production.
          Successful production requires good housing, nutrition, clean water,
          health management, biosecurity, and accurate records.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Key Areas</h2>
        <ul className="mt-4 space-y-3 text-gray-700">
          <li>🐣 Chick and pullet management</li>
          <li>🏠 Proper housing</li>
          <li>🌾 Feed and nutrition</li>
          <li>💧 Clean water</li>
          <li>💊 Health management</li>
          <li>🧹 Biosecurity</li>
          <li>🥚 Egg production</li>
          <li>📊 Farm records</li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <button onClick={complete} className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white">
            {completed ? "Lesson Completed ✓" : "Mark Lesson Complete ✓"}
          </button>

          <Link href="/courses/layer-farming/lesson-2" className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">
            Next Lesson →
          </Link>
        </div>
      </div>
    </main>
  );
}
