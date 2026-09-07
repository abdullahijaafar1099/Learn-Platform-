"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [payments, setPayments] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        window.location.href = "/admin/login";
        return;
      }

      const headers = {
        Authorization: `Bearer ${session.access_token}`,
      };

      fetch("/api/courses", { headers })
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setCourses(data);
        });

      fetch("/api/lessons", { headers })
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setLessons(data);
        });

      fetch("/api/admin/payments")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") setPayments(data.count);
      });
      fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") setUsers(data.count);
      });
    }

    loadDashboard();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          PoultryWise Admin Dashboard
        </h1>

        <p style={{ color: "#64748b", marginBottom: "30px" }}>
          Manage your PoultryWise learning platform.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
            <h2>Courses</h2>
            <strong style={{ fontSize: "32px" }}>{courses.length}</strong>
          </div>

          <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
            <h2>Lessons</h2>
            <strong style={{ fontSize: "32px" }}>{lessons.length}</strong>
          </div>

          <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
            <h2>Users</h2>
            <strong style={{ fontSize: "32px" }}>{users}</strong>
          </div>

          <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
            <h2>Subscriptions</h2>
            <strong style={{ fontSize: "32px" }}>{payments}</strong>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "16px",
          }}
        >
          <h2>Quick Actions</h2>

          <a
            href="/admin/courses"
            style={{
              display: "inline-block",
              marginTop: "15px",
              padding: "12px 18px",
              background: "#166534",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Manage Courses
          </a>
        </div>
      </div>
    </main>
  );
}
