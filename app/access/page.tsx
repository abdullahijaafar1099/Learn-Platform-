"use client";

import { useState } from "react";

export default function AccessPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("NG");

  async function startPayment() {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, country }),
      });

      const data = await response.json();

      if (!response.ok || !data.authorization_url) {
        setMessage(data.error || "Unable to start payment.");
        return;
      }

      window.location.href = data.authorization_url;
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="text-5xl">🐔</div>

          <h1 className="mt-4 text-3xl font-extrabold text-green-800 md:text-4xl">
            PoultryWise Learning Access
          </h1>

          <p className="mt-3 text-gray-600">
            Learn poultry farming, read practical books, and grow your
            poultry business.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-white p-8 shadow-lg">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-green-600">
            Affordable Learning Access
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
              <div className="text-3xl">🇳🇬</div>
              <h2 className="mt-2 font-bold text-gray-900">Nigeria</h2>
              <p className="mt-2 text-3xl font-extrabold text-green-700">
                ₦1,500
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-center">
              <div className="text-3xl">🌍</div>
              <h2 className="mt-2 font-bold text-gray-900">International</h2>
              <p className="mt-2 text-3xl font-extrabold text-blue-700">
                $2
              </p>
            </div>
          </div>

          <div className="mt-7">
            <label className="mb-2 block text-sm font-semibold text-gray-700">Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3">
              <option value="NG">🇳🇬 Nigeria — ₦1,500</option>
              <option value="OTHER">🌍 Other countries — $2</option>
            </select>
          </div>

          <div className="mt-7">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {message && (
            <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={startPayment}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Connecting to Paystack..." : "🔐 Get Learning Access"}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Secure payment powered by Paystack.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-3xl">📚</div>
            <h2 className="mt-3 font-bold">Books</h2>
            <p className="mt-1 text-sm text-gray-600">
              Practical poultry farming books and guides.
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-3xl">🎓</div>
            <h2 className="mt-3 font-bold">Courses</h2>
            <p className="mt-1 text-sm text-gray-600">
              Step-by-step poultry farming education.
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-3xl">📋</div>
            <h2 className="mt-3 font-bold">Business Support</h2>
            <p className="mt-1 text-sm text-gray-600">
              Request help with poultry business planning.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
