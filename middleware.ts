import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./services/axiosInstance";

const PROTECTED_ROUTES = ["/store/account"];
const PUBLIC_WITH_AUTH_CONTEXT = ["/store", "/store/products"];

const tokenValidationCache = new Map<
  string,
  { isValid: boolean; timestamp: number }
>();
const CACHE_DURATION = 5 * 60 * 1000;

// 60 * 60 * 1000; // 1 hour

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const needsAuthContext = PUBLIC_WITH_AUTH_CONTEXT.some((route) =>
    pathname.startsWith(route)
  );

  // If no token is needed for this route, skip validation
  if (!isProtected && !needsAuthContext) {
    return NextResponse.next();
  }

  // === undefined
  if (isProtected && !token) {
    const loginUrl = new URL("/store/login", req.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      encodeURIComponent(req.nextUrl.pathname)
    );
    return NextResponse.redirect(loginUrl);
  }

  if (needsAuthContext && !token) {
    return NextResponse.next();
  }

  try {
    // Check if token validation is cached
    const cachedValidation = tokenValidationCache.get(token!);
    const now = Date.now();

    if (cachedValidation && now - cachedValidation.timestamp < CACHE_DURATION) {
      // Use cached result if available and not expired
      if (!cachedValidation.isValid && isProtected) {
        if (!cachedValidation.isValid && isProtected) {
          const loginUrl = new URL("/store/login", req.url);
          return NextResponse.redirect(loginUrl);
        }
      }
      // Otherwise proceed with the request
      return NextResponse.next();
    }

    // Validate token with API call
    const response = await api.get("/user/profile", {
      headers: {
        Cookie: `token=${token}`,
      },
      timeout: 3000, // Add timeout to prevent hanging requests
    });

    console.log(response);

    // Cache successful validation
    tokenValidationCache.set(token!, { isValid: true, timestamp: now });

    // For protected and public routes, we continue with the validated token
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication error:", error || "Unknown error");

    if (isProtected) {
      tokenValidationCache.set(token!, {
        isValid: false,
        timestamp: Date.now(),
      });
      return redirectToLogin(req);
    }

    // For non-protected routes with auth context, proceed even if validation fails
    return NextResponse.next();
  }
}

function redirectToLogin(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/store/login", req.url));
  response.cookies.delete("token");
  return response;
}
