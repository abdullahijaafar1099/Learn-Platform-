"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PaymentCallbackPage() {
  const [status, setStatus] = useState("Verifying your payment...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");
    const type = params.get("type");

    if (!reference) {
      setStatus("Payment reference not found.");
      return;
    }

    async function verifyPayment() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setStatus("Please login again to verify your payment.");
        return;
      }

      const isCertificate = type === "certificate";

      const endpoint = isCertificate
        ? "/api/certificate/verify?reference="
        : "/api/paystack/verify?reference=";

      const res = await fetch(
        endpoint + encodeURIComponent(reference),
        {
          headers: {
            Authorization: `Bearer ${data.session.access_token}`,
          },
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        if (isCertificate) {
          setStatus(
            "Certificate payment verified successfully! Redirecting..."
          );

          setTimeout(() => {
            window.location.href = "/certificate";
          }, 1500);
        } else {
          setStatus(
            "Payment verified successfully! Redirecting to learning..."
          );

          setTimeout(() => {
            window.location.href = "/learning";
          }, 1500);
        }
      } else {
        setStatus(
          result.error || "Payment could not be verified."
        );
      }
    }

    verifyPayment();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="text-5xl">🐔</div>

        <h1 className="mt-4 text-2xl font-bold text-green-700">
          PoultryWise
        </h1>

        <p className="mt-4 text-gray-600">{status}</p>
      </div>
    </main>
  );
}
