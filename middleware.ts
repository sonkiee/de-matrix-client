import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./services/axiosInstance";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;
  const isProtected = pathname.startsWith("/store/account");
  // === undefined
  if (isProtected && token === undefined) {
    const loginUrl = new URL("/store/login", req.url);
    // loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    console.log("token", token);
    try {
      const response = await api.get("/users/profile", {
        headers: {
          Cookie: `token=${token}`,
        },
      });
      // console.log(response);
      if (!response) {
        const loginUrl = new URL("/store/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      // Clear token and redirect to login on auth failure
      const response = NextResponse.redirect(new URL("/store/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}
