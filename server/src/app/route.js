import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status_code: 200,
    message: "Serving is up and running!"
  })
}