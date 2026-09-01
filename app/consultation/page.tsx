"use client";

import { useState } from "react";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="text-5xl">✅</div>
          <h1 className="mt-4 text-2xl font-bold text-green-700">
            Consultation Request Received
          </h1>
          <p className="mt-3 text-gray-600">
            Thank you. Our PoultryWise team will review your request and
            contact you.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
          >
            Back to PoultryWise
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="text-5xl">💼</div>
          <h1 className="mt-4 text-3xl font-extrabold text-green-800">
            Poultry Business Consultation
          </h1>
          <p className="mt-3 text-gray-600">
            Get professional guidance for planning, starting, improving, or
            expanding your poultry business.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl bg-white p-8 shadow-lg"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              required
              type="text"
              placeholder="Your full name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              required
              type="tel"
              placeholder="+234..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Poultry Business Type
            </label>
            <select
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-500"
            >
              <option value="">Select business type</option>
              <option>Broiler Production</option>
              <option>Layer Farming</option>
              <option>Hatchery</option>
              <option>Poultry Feed Business</option>
              <option>Mixed Poultry Business</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              What do you need help with?
            </label>
            <textarea
              required
              rows={5}
              placeholder="Tell us about your poultry business and the support you need..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 px-6 py-4 font-bold text-white hover:bg-green-700"
          >
            📋 Request Consultation
          </button>
        </form>
      </div>
    </main>
  );
}
