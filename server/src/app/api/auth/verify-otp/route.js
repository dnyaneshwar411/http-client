import { _throwError } from "@/lib/http-request"
import { buildTokens } from "@/services/jwt/token"
import { findUserWithFilterRetrieveWithField } from "@/services/user"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { userId, otp } = await request.json()
    const user = await findUserWithFilterRetrieveWithField(
      { googleUserId: userId, otp },
      ""
    )

    if (!Boolean(user)) _throwError(
      401, "Unauthorized: Invalid OTP or user not found."
    )

    const { access, refresh } = await buildTokens({
      name: user.name,
      _id: String(user._id)
    })

    return NextResponse.json({
      status_code: 200,
      data: {
        access,
        refresh
      }
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error!"
    }, { status: error.statusCode })
  }
}