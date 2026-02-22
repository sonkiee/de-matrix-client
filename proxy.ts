import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isProtected = pathname.startsWith("/store/account");
  const isStoreSignIn = pathname === "/store/signin";

  if (isProtected && !token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/store/signin";
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);

    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("token");
    return res;
  }

  if (isStoreSignIn && token) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/store";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/store/:path*"],
};
