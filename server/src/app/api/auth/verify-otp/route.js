import { findUserWithFilterRetrieveWithField } from "@/services/user"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { userId, otp } = await request.json()
    const user = await findUserWithFilterRetrieveWithField(
      { googleUserId: userId, otp },
      ""
    )

    return NextResponse.json({
      status_code: 200,
      message: "Successfull"
    })
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      message: error.message || "Internal Server Error!"
    })
  }
}