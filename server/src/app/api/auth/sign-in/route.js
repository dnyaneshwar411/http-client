import { DUMMY_ACCOUNTS } from "@/config/data";
import { _throwError, buildUrlWithQueryParams } from "@/lib/http-request";
import { sendEmail } from "@/services/email";
import { createOTP } from "@/services/otp";
import { signUpUserGoogleAccount, findUserWithFields, udpateUserById } from "@/services/user";
import { auth } from "@clerk/nextjs/server"
import { addMinutes } from "date-fns";
import { NextResponse } from "next/server";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY

export async function GET(request) {
  try {
    const { isAuthenticated, userId } = await auth()

    if (!isAuthenticated) return NextResponse.redirect(
      new URL("/auth/sign-in", request.url)
    )



    let user = await findUserWithFields(userId, "email")
    if (!user) {
      const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${CLERK_SECRET_KEY}`
        }
      })
      user = await signUpUserGoogleAccount(await response.json(), userId)
    }


    const otp = createOTP({
      dummy: DUMMY_ACCOUNTS.includes(user.email)
    });


    await udpateUserById(user._id, {
      otp,
      expiration: addMinutes(new Date(), 5)
    })

    if (otp !== 123456) await sendEmail({
      to: user.email,
      subject: "Login OTP",
      text: `${otp}`
    })


    const redirectURL = buildUrlWithQueryParams("/redirect", {
      code: userId
    })
    return NextResponse.redirect(
      new URL(redirectURL, request.url)
    )
  } catch (error) {
    return NextResponse.json({
      status_code: 500,
      message: error.message || "Internal Server Error!"
    })
  }
}

export async function POST(request) {
  try {
    const body = request.json()
    const { isAuthenticated, userId } = await auth()
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