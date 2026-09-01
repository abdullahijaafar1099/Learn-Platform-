"use client";

import { useEffect, useState } from "react";

export default function PaymentCallbackPage() {
  const [status, setStatus] = useState("Verifying your payment...");

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get("reference");

    if (!reference) {
      setStatus("Payment reference not found.");
      return;
    }

    fetch("/api/paystack/verify?reference=" + encodeURIComponent(reference))
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("poultrywise_access", "granted");
          setStatus("Payment verified successfully! Your learning access is ready.");
        } else {
          setStatus("Payment could not be verified.");
        }
      })
      .catch(() => {
        setStatus("Unable to verify payment. Please try again.");
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="text-5xl">🐔</div>

        <h1 className="mt-4 text-2xl font-bold text-green-700">
          PoultryWise
        </h1>

        <p className="mt-4 text-gray-600">{status}</p>

        <a
          href="/learning"
          className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
        >
          🎓 Go to Learning
        </a>
      </div>
    </main>
  );
}
