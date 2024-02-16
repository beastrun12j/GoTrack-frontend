import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (
      auth.userId &&
      req.nextUrl.pathname !== "/dashboard" &&
      (req.nextUrl.pathname === "/auth/login" ||
        req.nextUrl.pathname === "/auth/register" ||
        req.nextUrl.pathname === "/auth/forgot-password")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },

  publicRoutes: ["/", "/auth/forgot-password"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
