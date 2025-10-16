"use server"
import { _throwError, allSearchParams } from "@/lib/http-request";
import { buildRequestPayload } from "@/lib/request-parser";
import { createNewCollection, retrieveUserCollections, updateCollection } from "@/services/db/collection";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { _id: userId } = buildRequestPayload(request);
    console.log(request.url)

    const { workspaceId } = allSearchParams(request.url)
    console.log(workspaceId)
    if (!isValidObjectId(workspaceId)) _throwError(
      400, "BAD Request: workspaceId should be a valid mongo objectId."
    )


    const data = await retrieveUserCollections(userId, workspaceId);

    return NextResponse.json({
      status_code: 200,
      data
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error!"
    }, { status: error.statusCode || 500 })
  }
}

export async function POST(request) {
  try {
    const { _id: userId } = buildRequestPayload(request);


    const { workspaceId, ...body } = await request.json()
    if (!isValidObjectId(workspaceId)) _throwError(
      400, "BAD Request: workspaceId should be a valid mongo objectId."
    )

    await createNewCollection(userId, workspaceId, body)

    return NextResponse.json({
      status_code: 200,
      message: "Successfull"
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error!"
    })
  }
}

export async function PUT(request) {
  try {
    const { userId, collectionId } = await request.json()

    await updateCollection(userId, collectionId)

    return NextResponse.json({
      status_code: 200,
      message: "Successfull"
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error!"
    })
  }
}