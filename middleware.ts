import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./services/axiosInstance";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  try {
    const token = req.cookies.get("token")?.value;
    console.log("your stored token", token);

    const isProtected = pathname.startsWith("/store/account");
    //   !token) ||
    if (isProtected && token === undefined) {
      const loginUrl = new URL("/store/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (token) {
      const response = await api.get("/users/profile");
      if (!response) {
        req.cookies.delete("token");
        return NextResponse.redirect(req.nextUrl);
      } else {
        console.log("logged in ");
      }
    }
  } catch (error: any) {
    throw new Error("Invalid token", error);
  }

  return NextResponse.next();
}
