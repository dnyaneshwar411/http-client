import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    statuc_code: 200,
    message: "Sign In Endpoint"
  })
}

export async function POST() {

}