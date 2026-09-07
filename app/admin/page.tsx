"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        window.location.href = "/auth";
        return;
      }

      const currentUserEmail = user.email?.trim().toLowerCase() || "";
      const configuredAdminEmail =
        process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase() || "";

      setUserEmail(currentUserEmail);
      setAdminEmail(configuredAdminEmail);

      if (
        !currentUserEmail ||
        !configuredAdminEmail ||
        currentUserEmail !== configuredAdminEmail
      ) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      setAllowed(true);
      setChecking(false);
    }

    checkAdmin();
  }, []);

  if (checking) {
    return <main className="p-8">Checking access...</main>;
  }

  if (!allowed) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Access Denied
          </h1>
          <p className="mt-2">User email: {userEmail}</p>
          <p>
            Admin email configured: {adminEmail ? "YES" : "NO"}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-800">
        PoultryWise Admin Dashboard
      </h1>
      <p className="mt-2 text-gray-600">
        Welcome to the admin area.
      </p>
    </main>
  );
}
