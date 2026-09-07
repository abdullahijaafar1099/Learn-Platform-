import Link from "next/link";
import Image from "next/image";
import MobileNav from "./components/MobileNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-extrabold text-green-700">
            🐔 PoultryWise
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="font-medium hover:text-green-700">
              Home
            </Link>
            <Link href="/courses" className="font-medium hover:text-green-700">
              Courses
            </Link>
            <Link href="/books" className="font-medium hover:text-green-700">
              Books
            </Link>
            <Link href="/consultation" className="font-medium hover:text-green-700">
              Consultation
            </Link>
            <Link
              href="/auth"
              className="rounded-xl bg-green-600 px-5 py-2.5 font-bold text-white hover:bg-green-700"
            >
              Login
            </Link>
          </div>

          <MobileNav />
        </div>
      </nav>

      <section className="bg-gradient-to-br from-green-900 via-green-700 to-green-500 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-green-100">
              PoultryWise Learning Platform
            </p>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
              Learn Poultry Farming. Build Better Farms. Grow Your Business.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
              Practical poultry courses, expert learning resources, useful
              books, and business consultation designed to help farmers improve
              production and profitability.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/auth"
                className="rounded-xl bg-white px-6 py-3 font-bold text-green-700 shadow-lg hover:bg-green-50"
              >
                🚀 Start Learning
              </Link>

              <Link
                href="/courses"
                className="rounded-xl border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <Image
              src="/images/poultrywise-hero.svg"
              alt="PoultryWise poultry farming"
              width={900}
              height={650}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-green-600">
            What PoultryWise Offers
          </p>

          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Everything You Need to Learn and Grow
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
            <div className="text-5xl">🎓</div>
            <h3 className="mt-5 text-xl font-bold">Poultry Courses</h3>
            <p className="mt-3 leading-7 text-gray-600">
              Learn practical broiler, layer, production, health, feeding,
              and farm management techniques.
            </p>
            <Link
              href="/courses"
              className="mt-5 inline-block font-bold text-green-700 hover:text-green-800"
            >
              View Courses →
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
            <div className="text-5xl">📚</div>
            <h3 className="mt-5 text-xl font-bold">Books & Guides</h3>
            <p className="mt-3 leading-7 text-gray-600">
              Access structured poultry books and technical guides covering
              production, health, nutrition, and business.
            </p>
            <Link
              href="/books"
              className="mt-5 inline-block font-bold text-green-700 hover:text-green-800"
            >
              Explore Books →
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
            <div className="text-5xl">💼</div>
            <h3 className="mt-5 text-xl font-bold">Expert Consultation</h3>
            <p className="mt-3 leading-7 text-gray-600">
              Get support with farm planning, production challenges, business
              strategy, expansion, and poultry operations.
            </p>
            <Link
              href="/consultation"
              className="mt-5 inline-block font-bold text-green-700 hover:text-green-800"
            >
              Request Consultation →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-green-600">
              Featured Learning
            </p>

            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Popular Courses
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                Poultry Farming
              </span>

              <h3 className="mt-5 text-2xl font-bold">
                Broiler Production
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Learn practical methods for broiler housing, feeding, health,
                management, and efficient meat production.
              </p>

              <Link
                href="/courses/broiler-production"
                className="mt-6 inline-block rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
              >
                View Course
              </Link>
            </article>

            <article className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                Poultry Farming
              </span>

              <h3 className="mt-5 text-2xl font-bold">
                Layer Farming
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Understand flock management, feeding, egg production, health,
                and profitable commercial layer farming.
              </p>

              <Link
                href="/courses/layer-farming"
                className="mt-6 inline-block rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
              >
                View Course
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-green-800 p-10 text-white md:p-14">
          <div className="grid gap-10 md:grid-cols-4 md:items-center">
            <div>
              <p className="text-4xl font-extrabold">20+</p>
              <p className="mt-2 text-green-100">Courses</p>
            </div>

            <div>
              <p className="text-4xl font-extrabold">160+</p>
              <p className="mt-2 text-green-100">Lessons</p>
            </div>

            <div>
              <p className="text-4xl font-extrabold">30+</p>
              <p className="mt-2 text-green-100">Books & Guides</p>
            </div>

            <div>
              <p className="text-4xl font-extrabold">24/7</p>
              <p className="mt-2 text-green-100">Learning Access</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-10 text-center shadow-lg ring-1 ring-gray-100">
          <div className="text-5xl">🚀</div>

          <h2 className="mt-5 text-3xl font-extrabold">
            Ready to Improve Your Poultry Business?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Join PoultryWise and learn practical knowledge that can help you
            make better farming and business decisions.
          </p>

          <Link
            href="/auth"
            className="mt-7 inline-block rounded-xl bg-green-600 px-7 py-3.5 font-bold text-white shadow hover:bg-green-700"
          >
            Get Started
          </Link>
        </div>
      </section>

      <footer className="bg-gray-950 px-6 py-10 text-center text-gray-300">
        <p className="text-2xl font-extrabold text-white">
          🐔 PoultryWise
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Learn • Read • Grow
        </p>

        <div className="mt-5 flex justify-center gap-6 text-sm">
          <Link href="/courses" className="hover:text-white">
            Courses
          </Link>

          <Link href="/books" className="hover:text-white">
            Books
          </Link>

          <Link href="/consultation" className="hover:text-white">
            Consultation
          </Link>

          <Link href="/auth" className="hover:text-white">
            Login
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          © 2026 PoultryWise. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
