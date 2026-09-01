import Link from "next/link";

export default function LessonSixPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Broiler Production
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Lesson 6: Farm Records & Cost Management
          </h1>

          <p className="mt-4 text-green-50">
            Learn how good records help you understand farm performance and
            make better business decisions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why Farm Records Matter
          </h2>

          <p className="mt-4 leading-8 text-gray-600">
            Accurate records help farmers monitor production, identify
            problems, calculate costs, and evaluate profitability. Records
            should be updated regularly and kept in an organized manner.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Important Records to Keep
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🐔 Flock Records
              </h3>
              <p className="mt-1 text-gray-700">
                Record the number of birds, additions, mortality, and
                important flock observations.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                🌾 Feed Records
              </h3>
              <p className="mt-1 text-gray-700">
                Track feed purchases, quantities used, and feed costs.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                💰 Expense Records
              </h3>
              <p className="mt-1 text-gray-700">
                Record expenses such as chicks, feed, medication, labor,
                transport, utilities, and other farm costs.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="font-bold text-green-800">
                📈 Sales Records
              </h3>
              <p className="mt-1 text-gray-700">
                Record birds sold, quantities, selling prices, customers,
                and total revenue.
              </p>
            </div>
          </div>

          <h2 className="mt-10 text-2xl font-bold">
            Understanding Farm Profit
          </h2>

          <div className="mt-5 rounded-xl bg-gray-50 p-5">
            <p className="font-semibold text-gray-800">
              Profit = Total Revenue − Total Costs
            </p>

            <p className="mt-3 leading-7 text-gray-600">
              Reviewing revenue and costs helps you determine whether the
              production cycle was profitable and where improvements may be
              needed.
            </p>
          </div>

          <div className="mt-10 rounded-xl bg-green-50 p-5">
            <h3 className="font-bold text-green-800">
              Lesson Objective
            </h3>

            <p className="mt-2 leading-7 text-green-900">
              Understand the importance of farm records and basic cost
              management for successful broiler production.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-2xl font-bold text-green-800">
              🎉 Course Lessons Completed
            </h2>

            <p className="mt-3 leading-7 text-green-900">
              You have reached the final lesson of the Broiler Production
              course. Review the lessons and apply the knowledge carefully
              to your poultry farming operation.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/courses/broiler-production/lesson-5"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Previous Lesson
            </Link>

            <Link
              href="/courses/broiler-production"
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              🎓 Course Overview
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
