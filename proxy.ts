import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

    const isCourseRoute = pathname.startsWith("/courses");

    const isBookRoute = pathname === "/books" || pathname.startsWith("/books/");
    const isCertificatePaymentRoute = pathname === "/certificate/payment";

  if (!isAdminRoute && !isCourseRoute && !isBookRoute && !isCertificatePaymentRoute) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const email = data.user.email?.trim().toLowerCase() || "";
  const adminEmail =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase() || "";

  if (isAdminRoute) {
    if (email && adminEmail && email === adminEmail) {
      return response;
    }

    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (email && adminEmail && email === adminEmail) {
    return response;
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: payment } = await adminSupabase
    .from("payments")
    .select("id")
    .eq("email", email)
    .eq("status", "success")
    .limit(1)
    .maybeSingle();

  if (!payment) {
    return NextResponse.redirect(new URL("/access", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/courses/:path*", "/books/:path*", "/certificate/payment"],
};
