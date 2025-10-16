import { _throwError } from "@/lib/http-request";
import { buildRequestPayload } from "@/lib/request-parser";
import { checkIfUserHasAccessToNodePath, createNewNodeWithFilter } from "@/services/db/node";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { _id: userId } = buildRequestPayload(request);
    if (!isValidObjectId(userId)) _throwError(
      401, "Bad Request: Invalid request"
    )

    return NextResponse.json({
      status_code: 200,
      data
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error."
    }, { status: error.statusCode || 500 })
  }
}

export async function POST(request) {
  try {
    const { _id: userId } = buildRequestPayload(request);
    if (!isValidObjectId(userId)) _throwError(
      401, "Bad Request: Invalid request"
    )

    const { nodeId, ...payload } = await request.json();
    if (!isValidObjectId(nodeId)) _throwError(
      400, "Bad Request: nodeId should be a valid mongoDB ObjectId."
    )


    // check if the client can create a request for this collection.
    const hasAccess = await checkIfUserHasAccessToNodePath(userId, nodeId)
    if (!hasAccess) _throwError(
      400, `Bad Request: You cannot create a ${payload.type} in this folder.`
    )

    const body = await request.json();

    await createNewNodeWithFilter(nodeId, body)


    return NextResponse.json({
      status_code: 200,
      message: "Successfull!"
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error."
    }, { status: error.statusCode || 500 })
  }
}