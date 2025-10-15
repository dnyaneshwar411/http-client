import { _throwError } from "@/lib/http-request";
import { buildRequestPayload } from "@/lib/request-parser";
import { findUserWithFilterRetrieveWithField } from "@/services/user";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { _id } = buildRequestPayload(request)

    if (!isValidObjectId(_id)) _throwError(
      401, "Unauthorized: User not logged In"
    )

    const data = await findUserWithFilterRetrieveWithField({ _id }, "")
    console.log(data)
    if (!Boolean(data)) _throwError(
      400, "BAD Request: User with these credentials not found!"
    )

    return NextResponse.json({
      status_code: 200,
      data
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error."
    }, { status: error.statusCode || 500 })
  }
}