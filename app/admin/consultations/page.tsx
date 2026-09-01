"use client";
import { useEffect, useState } from "react";

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_type: string;
  message: string;
  status: string;
  created_at: string;
};

export default function ConsultationsPage() {
  const [requests, setRequests] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/consultations")
      .then((res) => res.json())
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold text-green-800">Consultation Requests</h1>
        <p className="mt-2 text-gray-600">View and manage poultry business consultation requests.</p>

        {loading ? (
          <p className="mt-8 text-gray-600">Loading requests...</p>
        ) : requests.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow">No consultation requests found.</div>
        ) : (
          <div className="mt-8 grid gap-5">
            {requests.map((request) => (
              <div key={request.id} className="rounded-2xl bg-white p-6 shadow">
                <div className="flex flex-col justify-between gap-3 md:flex-row">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{request.name}</h2>
                    <p className="text-sm text-gray-600">{request.email} • {request.phone}</p>
                  </div>
                  <span className="h-fit rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">{request.status}</span>
                </div>
                <p className="mt-4 font-semibold text-green-700">{request.business_type}</p>
                <p className="mt-2 text-gray-700">{request.message}</p>
                <p className="mt-4 text-xs text-gray-500">{new Date(request.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
