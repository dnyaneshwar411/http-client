import { _throwError } from "@/lib/http-request";
import { signAccessToken, verifyRefreshToken } from "@/services/jwt/token";
import { validateUser } from "@/services/jwt/validate";
import { findUserWithFields } from "@/services/db/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { status, message, payload } = await verifyRefreshToken(request)

    if (status === "logged-out") return NextResponse.json({
      status_code: 401,
      message: "Unauthorized: Access to this resource requires valid authentication credentials."
    }, { status: 401 })

    if (
      Boolean(message) &&
      status === "malformed-access-token"
    ) return NextResponse.json({ status_code: 400, message }, {
      status: 401
    })


    if (status === "access-token-expired") return NextResponse.json({
      status_code: 403,
      message: "JWT refresh token expired. You need to login again."
    }, { status: 403 })

    const { _id: userId } = payload

    const user = await findUserWithFields(userId, "name")
    if (!user) _throwError(
      401, "Unauthorized: User not found or invalid credentials."
    )

    const token = await signAccessToken({
      _id: String(_id),
      name: user.name
    })

    return NextResponse.json({
      status_code: 200,
      token
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error!"
    })
  }
}