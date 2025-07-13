import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith("/admin");

  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  console.log("Middleware check:", {
    path,
    token: token ? "exists" : "missing",
    userRole,
    isAdminPath
  });

  if (isAdminPath) {
    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    
    if (!userRole || userRole.toLowerCase() !== "admin") {
      console.log("Invalid role:", userRole, "redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
