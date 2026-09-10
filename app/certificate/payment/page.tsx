"use client";

import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CertificatePaymentPage() {
  const payForCertificate = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
      window.location.href = "/auth";
      return;
    }

    const response = await fetch("/api/certificate/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: "NG" }),
    });

    const result = await response.json();

    if (result.authorization_url) {
      window.location.href = result.authorization_url;
    } else {
      alert(result.error || "Certificate payment initialization failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-6xl">🏆</div>

        <h1 className="mt-5 text-4xl font-extrabold text-green-800">
          PoultryWise Certificate
        </h1>

        <p className="mt-4 text-gray-600">
          You have completed the required courses and are eligible to apply
          for your PoultryWise Certificate.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold">Certificate Fee</h2>

          <p className="mt-4 text-4xl font-extrabold text-green-700">
            ₦1,500
          </p>

          <p className="mt-2 text-gray-500">
            Approximately $2
          </p>

          <button
            type="button"
            onClick={payForCertificate}
            className="mt-6 w-full rounded-xl bg-green-600 px-6 py-4 font-bold text-white hover:bg-green-700"
          >
            Pay for Certificate →
          </button>

          <Link
            href="/certificate"
            className="mt-4 inline-block text-sm font-semibold text-gray-600"
          >
            ← Back to Certificate
          </Link>
        </div>
      </div>
    </main>
  );
}
