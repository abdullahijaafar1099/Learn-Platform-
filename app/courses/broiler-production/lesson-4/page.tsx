import Link from "next/link";

export default function LessonFourPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Broiler Production
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Lesson 4: Poultry Health & Disease Prevention
          </h1>

          <p className="mt-4 text-green-50">
            Learn basic practices for maintaining healthy broiler chickens.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Poultry Health Matters
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Healthy birds generally grow better and perform more efficiently.
            Disease prevention starts with good management, hygiene,
            biosecurity, suitable housing, nutrition, and early observation
            of changes in the flock.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Key Health Practices
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🧹 Maintain Cleanliness
              </h3>
              <p className="mt-1 text-gray-700">
                Keep houses, equipment, feeders, and drinkers clean and
                maintain good litter management.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🚪 Practice Biosecurity
              </h3>
              <p className="mt-1 text-gray-700">
                Control unnecessary visitors, clean equipment, and reduce
                opportunities for disease to enter or spread.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                👀 Observe Birds Daily
              </h3>
              <p className="mt-1 text-gray-700">
                Monitor appetite, activity, droppings, breathing, mortality,
                and other changes in flock behavior.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                💉 Follow Vaccination Plans
              </h3>
              <p className="mt-1 text-gray-700">
                Use an appropriate vaccination program developed with
                qualified poultry health professionals for your area.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-5">
            <h3 className="font-bold text-red-800">
              ⚠️ When Birds Become Sick
            </h3>

            <p className="mt-2 leading-7 text-red-900">
              Isolate or manage affected birds according to professional
              veterinary guidance and investigate unusual illness or
              mortality promptly. Avoid giving medications without appropriate
              professional advice.
            </p>
          </div>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              Understand the basic principles of poultry health, observation,
              hygiene, biosecurity, and disease prevention.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-3"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/broiler-production/lesson-5"
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
