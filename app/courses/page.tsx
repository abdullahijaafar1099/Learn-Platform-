"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export default function CoursesPage() {
  const [allowed, setAllowed] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function loadCourses() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        window.location.href = "/auth";
        return;
      }

      const headers = {
        Authorization: `Bearer ${session.access_token}`,
      };

      const accessResponse = await fetch("/api/access", { headers });
      const access = await accessResponse.json();

      if (!access.allowed) {
        window.location.href = "/access";
        return;
      }

      setAllowed(true);

      const response = await fetch("/api/courses", { headers });
      const coursesData = await response.json();

      setCourses(Array.isArray(coursesData) ? coursesData : []);
    }

    loadCourses();
  }, []);

  if (!allowed) return null;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      <section className="bg-gradient-to-br from-green-900 via-green-700 to-green-500 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-100">
              PoultryWise Academy
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              Poultry Farming Courses
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-green-50">
              Learn practical poultry production, management, feeding, health,
              and business skills through structured lessons.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-wider text-green-600">
            Featured Learning
          </p>

          <h2 className="mt-2 text-3xl font-extrabold">
            Start with a Course
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Build your poultry knowledge from the fundamentals to practical
            commercial farm management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <article className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-100">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-green-700 to-green-500 text-7xl">
              🐔
            </div>

            <div className="p-7">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                Broiler Production
              </span>

              <h3 className="mt-4 text-2xl font-extrabold">
                Broiler Production
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Learn housing, brooding, feeding, health management, growth
                monitoring, and profitable broiler production.
              </p>

              <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
                <span>📖 6 Lessons</span>
                <span>⏱ Practical Training</span>
              </div>

              <Link
                href="/courses/broiler-production"
                className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
              >
                Start Course →
              </Link>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-100">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-amber-600 to-yellow-400 text-7xl">
              🥚
            </div>

            <div className="p-7">
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                Layer Farming
              </span>

              <h3 className="mt-4 text-2xl font-extrabold">
                Layer Farming
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Learn flock management, feeding, egg production, health,
                housing, and practical commercial layer farming.
              </p>

              <div className="mt-5 flex items-center justify-between text-sm text-gray-500">
                <span>📖 6 Lessons</span>
                <span>⏱ Practical Training</span>
              </div>

              <Link
                href="/courses/layer-farming"
                className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
              >
                Start Course →
              </Link>
            </div>
          </article>

        </div>

        {courses.length > 0 && (
          <section className="mt-16">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wider text-green-600">
                PoultryWise Library
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                Available Courses
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">
                    📚
                  </div>

                  <span className="mt-5 text-xs font-bold uppercase tracking-wide text-green-700">
                    {course.category}
                  </span>

                  <h3 className="mt-2 text-xl font-extrabold">
                    {course.title}
                  </h3>

                  <p className="mt-3 flex-1 leading-7 text-gray-600">
                    {course.description}
                  </p>

                  <Link
                    href={`/courses/${course.id}`}
                    className="mt-6 rounded-xl bg-green-600 px-5 py-3 text-center font-bold text-white hover:bg-green-700"
                  >
                    View Course →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-800 p-8 text-center text-white md:p-12">
          <div className="text-5xl">🚀</div>

          <h2 className="mt-5 text-3xl font-extrabold">
            Build Better Poultry Skills
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-100">
            Study practical lessons, improve your farm decisions, and grow
            your poultry business with PoultryWise.
          </p>

          <Link
            href="/books"
            className="mt-7 inline-block rounded-xl bg-white px-6 py-3 font-bold text-green-700 hover:bg-green-50"
          >
            Explore Books →
          </Link>
        </div>
      </section>

    </main>
  );
}
