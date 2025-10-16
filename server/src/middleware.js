import { clerkMiddleware } from "@clerk/nextjs/server";
import { validateUser } from "./services/jwt/validate";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  try {
    if (!req.nextUrl.pathname.startsWith("/api/v1")) return NextResponse.next()


    const { status, message, payload } = await validateUser(req)

    if (status === "logged-out") return NextResponse.json({
      status_code: 401,
      message: "Unauthorized: Access to this resource requires valid authentication credentials."
    }, { status: 401 })

    if (
      Boolean(message) &&
      status === "malformed-access-token"
    ) return NextResponse.json({ status_code: 401, message }, {
      status: 401
    })


    if (status === "malformed-access-token") return NextResponse.json({
      status_code: 401,
      message: "Bad Request: The provided access token is malformed."
    }, { status: 401 })


    if (status === "access-token-expired") return NextResponse.json({
      status_code: 401,
      message: "JWT access token expired. Please re-authenticate or refresh your token."
    }, { status: 401 })



    const response = NextResponse.next({
      request: {
        headers: new Headers(req.headers),
      },
    });

    if (payload) response
      .headers
      .set("x-jwt-payload", JSON.stringify(payload));

    return response;
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      message: error.message || "Internal Server Error!"
    }, { status: 500 })
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};