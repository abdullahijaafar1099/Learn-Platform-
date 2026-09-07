"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    if (email.trim().toLowerCase() !== adminEmail) {
      await supabase.auth.signOut();
      setMessage("Access denied. Admin account required.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f1f5f9",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
        }}
      >
        <h1 style={{ marginBottom: "8px" }}>PoultryWise Admin</h1>

        <p style={{ color: "#64748b", marginBottom: "25px" }}>
          Admin Login
        </p>

        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
          }}
        >
          Login as Admin
        </button>

        {message && (
          <p style={{ marginTop: "15px", color: "#475569" }}>
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
