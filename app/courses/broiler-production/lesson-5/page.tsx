import Link from "next/link";

export default function LessonFivePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Broiler Production
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Lesson 5: Biosecurity & Farm Hygiene
          </h1>

          <p className="mt-4 text-green-50">
            Protecting your flock by reducing the risk of disease introduction
            and spread.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            What is Biosecurity?
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Biosecurity is a set of management practices used to reduce the
            chance of disease entering a poultry farm and spreading among
            birds. Good biosecurity should be part of everyday farm
            management.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Important Biosecurity Practices
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🚪 Control Farm Access
              </h3>
              <p className="mt-1 text-gray-700">
                Limit unnecessary visitors and keep a record of important
                farm entries.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                👢 Clean Footwear & Equipment
              </h3>
              <p className="mt-1 text-gray-700">
                Clean and disinfect appropriate footwear, equipment, and
                surfaces when moving between areas.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🧼 Clean Housing
              </h3>
              <p className="mt-1 text-gray-700">
                Maintain clean houses, feeders, drinkers, and surrounding
                areas.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🐀 Control Pests
              </h3>
              <p className="mt-1 text-gray-700">
                Reduce contact between poultry and rodents, wild birds,
                insects, and other potential disease carriers.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🐔 Manage New Birds Carefully
              </h3>
              <p className="mt-1 text-gray-700">
                Follow appropriate quarantine and introduction procedures
                recommended by poultry health professionals.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Daily Hygiene Checklist
            </h3>

            <ul className="mt-3 space-y-2 text-green-900">
              <li>✓ Check feeders and drinkers</li>
              <li>✓ Observe bird behavior</li>
              <li>✓ Remove obvious contamination</li>
              <li>✓ Check litter condition</li>
              <li>✓ Monitor unusual illness or mortality</li>
              <li>✓ Keep records of important observations</li>
            </ul>
          </div>

          <div className="mt-10 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
            <h3 className="font-bold text-yellow-800">
              ⚠️ Important
            </h3>

            <p className="mt-2 leading-7 text-yellow-900">
              Biosecurity procedures should be adapted to the farm, local
              disease risks, and applicable veterinary guidance.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-4"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/broiler-production/lesson-6"
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
