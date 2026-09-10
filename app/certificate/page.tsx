"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CertificatePage() {
  const [eligible, setEligible] = useState(false);
  const [paid, setPaid] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkCertificate() {
      let broiler = 0;
      let layer = 0;

      for (let i = 1; i <= 6; i++) {
        if (localStorage.getItem(`broiler-lesson-${i}-completed`) === "true") {
          broiler++;
        }

        if (localStorage.getItem(`layer-lesson-${i}-completed`) === "true") {
          layer++;
        }
      }

      const completed = broiler === 6 && layer === 6;
      setEligible(completed);

      if (!completed) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/auth";
        return;
      }

      const response = await fetch("/api/certificate/status", {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      const result = await response.json();

      if (result.paid) {
        setPaid(true);
        setCertificateId(result.certificateId || "");
        setPaymentDate(result.paymentDate || "");
      }

      setLoading(false);
    }

    checkCertificate();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Checking certificate status...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-6xl">🏆</div>

        <h1 className="mt-5 text-4xl font-extrabold text-green-800">
          PoultryWise Certificate
        </h1>

        <p className="mt-4 text-gray-600">
          Your PoultryWise learning achievement.
        </p>

        {!eligible ? (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold">
              Certificate Not Yet Available
            </h2>

            <p className="mt-3 text-gray-600">
              Complete both Broiler Production and Layer Farming courses
              before applying for your certificate.
            </p>

            <Link
              href="/learning"
              className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
            >
              Go to Learning Dashboard →
            </Link>
          </div>
        ) : !paid ? (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800">
              🎉 You are eligible!
            </h2>

            <p className="mt-3 text-gray-600">
              You have completed both required courses.
            </p>

            <Link
              href="/certificate/payment"
              className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
            >
              Pay ₦1,500 for Certificate →
            </Link>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="text-5xl">🎓</div>

            <h2 className="mt-4 text-3xl font-extrabold text-green-800">
              Certificate Earned
            </h2>

            <p className="mt-3 text-gray-600">
              Congratulations! You successfully completed the required
              PoultryWise courses.
            </p>

            <div className="mt-6 rounded-xl border-2 border-green-200 bg-green-50 p-6">
              <p className="text-sm font-semibold text-gray-500">
                CERTIFICATE ID
              </p>

              <p className="mt-2 text-2xl font-extrabold text-green-800">
                {certificateId}
              </p>

              <p className="mt-4 text-gray-600">
                Courses Completed:
              </p>

              <p className="mt-1 font-semibold">
                Broiler Production + Layer Farming
              </p>

              {paymentDate && (
                <p className="mt-4 text-sm text-gray-500">
                  Issued after payment on {new Date(paymentDate).toLocaleDateString()}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
            >
              Print Certificate
            </button>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/learning"
            className="text-sm font-semibold text-gray-600"
          >
            ← Back to Learning Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
