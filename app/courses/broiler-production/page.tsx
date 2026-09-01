import Link from "next/link";

export default function BroilerProductionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest">
            PoultryWise Learning
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Broiler Production
          </h1>

          <p className="mt-4 max-w-2xl text-green-50">
            Learn the essential practices for raising healthy broiler
            chickens and improving farm performance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">
            Course Overview
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            This course introduces the key principles of broiler production,
            from preparation and chick management to feeding, health,
            biosecurity, and record keeping.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            What You Will Learn
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-4">
              🐣 Chick preparation and brooding
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              🌾 Feed and nutrition management
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              💧 Water and environmental management
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              💊 Basic health and disease prevention
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              🧹 Farm hygiene and biosecurity
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              📊 Farm records and performance monitoring
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses/broiler-production/lesson-1"
              className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              ▶️ Start Learning
            </a>

            <Link
              href="/courses"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Back to Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
