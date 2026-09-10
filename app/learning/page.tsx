"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LearningPage() {
  const [allowed, setAllowed] = useState(false);
  const [broilerCompleted, setBroilerCompleted] = useState(0);
  const [layerCompleted, setLayerCompleted] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        window.location.href = "/auth";
        return;
      }

      const response = await fetch("/api/access", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const access = await response.json();

      if (!access.allowed) {
        window.location.href = "/access";
        return;
      }

      setAllowed(true);

      let broiler = 0;
      let layer = 0;

      for (let i = 1; i <= 6; i++) {
        if (localStorage.getItem(`broiler-lesson-${i}-completed`) === "true") {
          broiler++;
        }

        if (localStorage.getItem(`layer-lesson-${i}-completed`) === "true") {
          layer++;
        }
      }

      setBroilerCompleted(broiler);
      setLayerCompleted(layer);
    };

    loadProgress();

    window.addEventListener("focus", loadProgress);

    return () => {
      window.removeEventListener("focus", loadProgress);
    };
  }, []);

  if (!allowed) return null;

  const broilerProgress = Math.round((broilerCompleted / 6) * 100);
  const layerProgress = Math.round((layerCompleted / 6) * 100);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <div className="text-5xl">🐔</div>

          <h1 className="mt-4 text-3xl font-extrabold text-green-800">
            PoultryWise Learning
          </h1>

          <p className="mt-3 text-gray-600">
            Track your poultry farming learning progress.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* BROILER */}
          <div className="rounded-2xl bg-white p-7 shadow-lg">
            <div className="text-4xl">🐔</div>

            <h2 className="mt-4 text-xl font-bold">
              Broiler Production
            </h2>

            <p className="mt-2 text-gray-600">
              Practical training in broiler management, feeding,
              health, biosecurity, and farm records.
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                {broilerCompleted}/6 Lessons
              </span>

              <span className="font-bold text-green-700">
                {broilerProgress}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-green-600 transition-all"
                style={{ width: `${broilerProgress}%` }}
              />
            </div>

            {broilerCompleted === 6 && (
              <div className="mt-4 rounded-xl bg-green-50 p-3 text-center font-bold text-green-800">
                🏆 Course Completed!
              </div>
            )}

            <Link
              href="/courses/broiler-production"
              className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
            >
              {broilerCompleted === 6
                ? "Review Course →"
                : "Continue Learning →"}
            </Link>
          </div>

          {/* LAYER */}
          <div className="rounded-2xl bg-white p-7 shadow-lg">
            <div className="text-4xl">🥚</div>

            <h2 className="mt-4 text-xl font-bold">
              Layer Farming
            </h2>

            <p className="mt-2 text-gray-600">
              Learn layer management and improve egg production,
              flock health, and farm performance.
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-semibold text-gray-700">
                {layerCompleted}/6 Lessons
              </span>

              <span className="font-bold text-yellow-700">
                {layerProgress}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-yellow-500 transition-all"
                style={{ width: `${layerProgress}%` }}
              />
            </div>

            {layerCompleted === 6 && (
              <div className="mt-4 rounded-xl bg-yellow-50 p-3 text-center font-bold text-yellow-800">
                🏆 Course Completed!
              </div>
            )}

            <Link
              href="/courses/layer-farming"
              className="mt-5 inline-block rounded-xl bg-yellow-600 px-5 py-3 font-bold text-white hover:bg-yellow-700"
            >
              {layerCompleted === 6
                ? "Review Course →"
                : "Continue Learning →"}
            </Link>
          </div>

        </div>

        {/* ALL COURSES */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <Link
            href="/courses"
            className="rounded-2xl bg-white p-6 text-center shadow-lg hover:shadow-xl"
          >
            <div className="text-4xl">🎓</div>
            <h2 className="mt-3 text-xl font-bold">
              All Courses
            </h2>
            <p className="mt-2 text-gray-600">
              Explore all PoultryWise courses.
            </p>
          </Link>

          <Link
            href="/books"
            className="rounded-2xl bg-white p-6 text-center shadow-lg hover:shadow-xl"
          >
            <div className="text-4xl">📚</div>
            <h2 className="mt-3 text-xl font-bold">
              Books & Guides
            </h2>
            <p className="mt-2 text-gray-600">
              Read poultry farming books and practical guides.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}
