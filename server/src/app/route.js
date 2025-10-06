import config from "@/config/config";
import { NextResponse } from "next/server";

export function GET() {
  console.log(config.mongoose.url)
  return NextResponse.json({
    status_code: 200,
    message: "Great is up and running!"
  })
}