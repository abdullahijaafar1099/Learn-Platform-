"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
};

type Lesson = {
  id: string;
  title: string;
  content: string;
  course_id: string;
};

export default function CoursePage() {
  const params = useParams();
  const id = String(params.id);

  const [allowed, setAllowed] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    async function load() {
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

      const [coursesResponse, lessonsResponse] = await Promise.all([
        fetch("/api/courses", { headers }),
        fetch("/api/lessons", { headers }),
      ]);

      const coursesData = await coursesResponse.json();
      const lessonsData = await lessonsResponse.json();

      const foundCourse = Array.isArray(coursesData)
        ? coursesData.find((item: Course) => String(item.id) === id)
        : null;

      const foundLessons = Array.isArray(lessonsData)
        ? lessonsData
            .filter((lesson: Lesson) => String(lesson.course_id) === id)
            .sort((a: Lesson, b: Lesson) =>
              String(a.id).localeCompare(String(b.id), undefined, {
                numeric: true,
              })
            )
        : [];

      setCourse(foundCourse);
      setLessons(foundLessons);
      setAllowed(true);
    }

    load();
  }, [id]);

  if (!allowed) return null;

  if (!course) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">📚</div>
          <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
            Course not found
          </h1>
          <Link
            href="/courses"
            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
          >
            ← Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      <section className="bg-gradient-to-br from-green-900 via-green-700 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/courses"
            className="text-sm font-semibold text-green-100 hover:text-white"
          >
            ← Back to Courses
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">
              {course.category}
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-green-50">
              {course.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold">
              <span className="rounded-xl bg-white/10 px-4 py-3">
                📖 {lessons.length} Lessons
              </span>

              <span className="rounded-xl bg-white/10 px-4 py-3">
                🎓 Practical Learning
              </span>

              <span className="rounded-xl bg-white/10 px-4 py-3">
                🐔 PoultryWise Academy
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">

          <div>
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wider text-green-600">
                Course Curriculum
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                Course Lessons
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Follow the lessons in order and build your poultry farming
                knowledge step by step.
              </p>
            </div>

            {lessons.length > 0 ? (
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <article
                    key={lesson.id}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 font-extrabold text-green-700">
                          {index + 1}
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-green-600">
                            Lesson {index + 1}
                          </p>

                          <h3 className="mt-1 text-xl font-extrabold text-gray-900">
                            {lesson.title}
                          </h3>

                          <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                            {lesson.content}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/courses/${id}/lesson-${index + 1}`}
                        className="shrink-0 rounded-xl bg-green-600 px-5 py-3 text-center font-bold text-white hover:bg-green-700"
                      >
                        Start Lesson →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="text-4xl">📖</div>
                <p className="mt-4 font-semibold text-gray-700">
                  No lessons available yet.
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-100 lg:sticky lg:top-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">
              🎓
            </div>

            <h2 className="mt-5 text-2xl font-extrabold">
              Start Learning
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              Complete each lesson to build a stronger understanding of
              practical poultry production.
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-600">Lessons</span>
                <span className="font-extrabold text-green-700">
                  {lessons.length}
                </span>
              </div>
            </div>

            <Link
              href="/courses"
              className="mt-5 block rounded-xl border border-gray-200 px-5 py-3 text-center font-bold text-gray-700 hover:bg-gray-50"
            >
              Browse Other Courses
            </Link>
          </aside>

        </div>
      </section>
    </main>
  );
}
