"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const form = event.currentTarget;

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        setMessage("❌ Your admin session has expired. Please login again.");
        return;
      }

      const formData = new FormData(form);

      const response = await fetch("/api/admin/books", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.status === 401) {
        setMessage("❌ Please login again.");
        return;
      }

      if (response.status === 403) {
        setMessage(`❌ Admin access required: ${JSON.stringify(result.debug)}`);
        return;
      }

      if (!response.ok) {
        setMessage(`❌ ${result.message || "Upload failed."}`);
        return;
      }

      if (result.success) {
        setMessage("✅ Book uploaded successfully.");
        form.reset();
      } else {
        setMessage(`❌ ${result.message || "Upload failed."}`);
      }
    } catch {
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        Add New Book
      </h2>

      <p className="mb-6 text-sm text-gray-500">
        Add a book and upload its PDF to the Books Library.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Book Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter book title"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            rows={5}
            placeholder="Enter book description"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Category
          </label>

          <select
            name="category"
            defaultValue=""
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-500"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Poultry Farming">Poultry Farming</option>
            <option value="Chicken Health">Chicken Health</option>
            <option value="Feed & Nutrition">Feed & Nutrition</option>
            <option value="Farm Management">Farm Management</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Book PDF
          </label>

          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            required
            className="block w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-sm"
          />

          <p className="mt-2 text-xs text-gray-500">
            Only PDF files are accepted.
          </p>
        </div>

        {message && (
          <div className="rounded-xl bg-gray-50 p-4 text-sm font-medium">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Uploading..." : "📚 Add Book"}
        </button>
      </form>
    </div>
  );
}
