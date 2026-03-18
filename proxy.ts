import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

async function me(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
      headers: {
        // Cookie: `access_token=${token}`,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;
  const user = token ? await me(token) : null;

  const isProtected = pathname.startsWith("/account");
  const isSignIn = pathname === "/signin";
  const isAdminRoute = pathname.startsWith("/admin");

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/signin";
  loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);

  if (token && !user) {
    if (isProtected) {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("access_token");
      return response;
    }
  }

  if (isProtected && !user) {
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("access_token");
    return res;
  }

  if (isAdminRoute && user?.role !== "admin") {
    console.warn(
      `Unauthorized admin access attempt by user:`,
      user?.id || "Guest",
    );

    // Kick them to the store or home page instead of letting the request proceed
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/account";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  if (isSignIn && user) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/account";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/signin", "/admin/:path*"],
};
