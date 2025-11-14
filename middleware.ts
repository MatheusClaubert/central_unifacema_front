import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Redireciona não autenticados para /login; libera rotas públicas e assets.
const PUBLIC_PATHS = [
  "/login",
  "/auth/callback",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isDev = process.env.NODE_ENV !== "production";

  // Helpers de teste (apenas dev): /dev-login?name=...&groups=... | /dev-logout
  if (isDev && pathname === "/dev-login") {
    const to = req.nextUrl.searchParams.get("to") || "/";
    const name = req.nextUrl.searchParams.get("name") || "";
    const groups = req.nextUrl.searchParams.get("groups") || "";
    const res = NextResponse.redirect(new URL(to, req.url));
    res.cookies.set("central_session", "1", { path: "/", maxAge: 60 * 60 * 24 });
    if (name) res.cookies.set("central_name", name, { path: "/", maxAge: 60 * 60 * 24 });
    if (groups) res.cookies.set("central_groups", groups, { path: "/", maxAge: 60 * 60 * 24 });
    return res;
  }
  if (isDev && pathname === "/dev-logout") {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.set("central_session", "", { path: "/", maxAge: 0 });
    res.cookies.set("central_name", "", { path: "/", maxAge: 0 });
    res.cookies.set("central_groups", "", { path: "/", maxAge: 0 });
    return res;
  }

  if (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/public/") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  const hasSession = Boolean(req.cookies.get("central_session")?.value);
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(png|jpg|jpeg|gif|svg|ico|webp)$).*)"],
};


