import Link from "next/link";

export default function LessonThreePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Broiler Production
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Lesson 3: Feed & Nutrition
          </h1>

          <p className="mt-4 text-green-50">
            Understanding feeding and nutrition for healthy broiler growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Nutrition Matters
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Good nutrition is essential for healthy growth, efficient feed
            utilization, strong immunity, and good production performance.
            Broilers need balanced feed and reliable access to clean water.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Important Nutritional Requirements
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🌾 Energy
              </h3>
              <p className="mt-1 text-gray-700">
                Energy supports growth, movement, and normal body functions.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                💪 Protein
              </h3>
              <p className="mt-1 text-gray-700">
                Protein provides essential building blocks for muscle and
                tissue development.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🧂 Vitamins & Minerals
              </h3>
              <p className="mt-1 text-gray-700">
                Vitamins and minerals support normal development, immunity,
                and body functions.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                💧 Water
              </h3>
              <p className="mt-1 text-gray-700">
                Clean and accessible drinking water is essential for poultry
                health and feed intake.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Feeding Management
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              Store feed in a clean, dry, protected area and monitor feed
              intake regularly. Avoid sudden unnecessary changes in the
              feeding program.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <h3 className="font-bold text-yellow-800">
              ⚠️ Important
            </h3>

            <p className="mt-2 leading-7 text-yellow-900">
              Feed formulation should be based on the birds' age, production
              stage, nutritional requirements, and locally available
              ingredients. For commercial production, use appropriately
              formulated poultry feed or consult a qualified poultry
              nutrition professional.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-2"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/broiler-production/lesson-4"
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
