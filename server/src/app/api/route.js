import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status_code: 200,
    message: "serving requests!",
  })
}