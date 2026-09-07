"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BroilerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        window.location.href = "/auth";
        return;
      }

      const response = await fetch("/api/access", {
        headers: {
          Authorization: "Bearer " + session.access_token,
        },
      });

      const access = await response.json();

      if (!access.allowed) {
        window.location.href = "/access";
        return;
      }

      setAllowed(true);
    }

    checkAccess();
  }, []);

  if (!allowed) return null;

  return <>{children}</>;
}
