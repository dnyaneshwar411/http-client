import { NextResponse } from "next/server";

export async function GET() {
  // console.log(await verifyAcessToken(TOKEN))
  // console.log(await signAccessToken({ _id: "68ebcd8d70801a145cb65368", name: "Dnyaneshwar Kawade" }))
  return NextResponse.json({
    status_code: 200,
    message: "Great is up and running!"
  })
}