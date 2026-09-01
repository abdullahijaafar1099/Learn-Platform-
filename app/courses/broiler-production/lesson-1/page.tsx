import Link from "next/link";

export default function LessonOnePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Broiler Production
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Lesson 1: Introduction to Broiler Production
          </h1>

          <p className="mt-4 text-green-50">
            Understanding the basics before starting a broiler farm.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is Broiler Production?
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Broiler production is the rearing of chickens specifically for
            meat production. Successful broiler farming requires proper
            housing, good nutrition, clean water, health management,
            biosecurity, and careful record keeping.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Key Areas to Understand
          </h2>

          <ul className="mt-5 space-y-3 text-gray-700">
            <li>🐣 Chick selection and preparation</li>
            <li>🏠 Proper poultry housing</li>
            <li>🌾 Feed and nutrition</li>
            <li>💧 Clean water management</li>
            <li>💊 Health and disease prevention</li>
            <li>🧹 Hygiene and biosecurity</li>
            <li>📊 Farm records and cost management</li>
          </ul>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              By the end of this lesson, you should understand the major
              factors that determine successful broiler production.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Course Overview
            </Link>

            <button
              type="button"
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              Mark Lesson Complete ✓
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
