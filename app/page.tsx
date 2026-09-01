import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="bg-gradient-to-r from-green-800 to-green-500 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-100">
            🐔 PoultryWise Learning
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Learn Poultry Farming, Grow Your Success
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-green-50">
            Practical courses, useful books, and learning resources to help
            poultry farmers build better and more profitable farms.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/books"
              className="rounded-xl bg-white px-6 py-3 font-bold text-green-700 shadow hover:bg-green-50"
            >
              📚 Explore Books
            </Link>

            <Link
              href="/admin/books"
              className="rounded-xl border border-white/50 px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              ⚙️ Admin
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Start Learning
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Everything You Need to Learn
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Explore poultry production knowledge designed for beginners,
            farmers, and anyone interested in poultry business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="text-5xl">🐔</div>

            <h3 className="mt-5 text-xl font-bold">
              Poultry Courses
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Learn broiler production, layer farming, poultry management,
              and practical farm techniques.
            </p>

            <Link
              href="/courses"
              className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              Explore Courses
            </Link>
          </article>

          <article className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="text-5xl">📚</div>

            <h3 className="mt-5 text-xl font-bold">
              Books & Guides
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Read useful poultry books, farming guides, and educational
              materials in one place.
            </p>

            <Link
              href="/books"
              className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
            >
              Browse Books
            </Link>
          </article>

          <article className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="text-5xl">📈</div>

            <h3 className="mt-5 text-xl font-bold">
              Farm Success
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Improve your knowledge of farm management, feeding,
              health, production, and poultry business.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
            >
              Learn More
            </button>
          </article>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                Featured Learning
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Popular Courses
              </h2>
            </div>

            <Link
              href="/books"
              className="font-semibold text-green-700 hover:underline"
            >
              View Learning Materials →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-gray-200 p-6">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Poultry Farming
              </span>

              <h3 className="mt-4 text-2xl font-bold">
                Broiler Production
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Learn how to raise healthy broiler chickens and improve
                production performance.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-200 p-6">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Poultry Farming
              </span>

              <h3 className="mt-4 text-2xl font-bold">
                Layer Farming
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Learn how to manage layers effectively for consistent and
                profitable egg production.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 px-6 py-10 text-center text-gray-300">
        <p className="text-lg font-bold text-white">
          🐔 PoultryWise
        </p>

        <p className="mt-2 text-sm">
          Learn • Read • Grow
        </p>

        <p className="mt-5 text-xs text-gray-500">
          © 2026 PoultryWise. All rights reserved.
        </p>
      </footer>
    
        <section className="mt-10 rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="text-4xl">💼</div>
          <h2 className="mt-3 text-2xl font-bold text-green-800">Poultry Business Consultation</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">Need help with poultry business planning, farm setup, production, or expansion?</p>
          <a href="/consultation" className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700">Request Consultation</a>
        </section>
      </main>
  );
}
