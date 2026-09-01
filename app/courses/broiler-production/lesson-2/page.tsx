import Link from "next/link";

export default function LessonTwoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Broiler Production
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Lesson 2: Poultry Housing
          </h1>

          <p className="mt-4 text-green-50">
            Creating a suitable environment for healthy broiler growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Importance of Good Housing
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Good poultry housing protects birds from harsh weather,
            predators, excessive heat, and poor environmental conditions.
            It also makes feeding, cleaning, health monitoring, and
            record keeping easier.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Important Housing Factors
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">🏠 Ventilation</h3>
              <p className="mt-1 text-gray-700">
                Provide adequate airflow while avoiding harmful drafts.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">🌡️ Temperature</h3>
              <p className="mt-1 text-gray-700">
                Maintain suitable temperatures, especially during brooding.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">💧 Clean Water</h3>
              <p className="mt-1 text-gray-700">
                Ensure birds have reliable access to clean drinking water.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">🧹 Cleanliness</h3>
              <p className="mt-1 text-gray-700">
                Keep the house clean and manage litter properly.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              Understand the basic requirements of a suitable broiler
              poultry house.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-1"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/broiler-production/lesson-3"
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              Next Lesson →
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
