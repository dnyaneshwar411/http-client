import { NextResponse } from "next/server";
import db from "@/lib/database"

export async function GET() {
  return NextResponse.json({
    status_code: 200,
    message: "serving requests!",
  })
}