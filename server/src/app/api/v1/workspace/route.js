import config from "@/config/config";
import { _throwError } from "@/lib/http-request";
import { buildRequestPayload } from "@/lib/request-parser";
import { createWorkSpaceForUser, findWorkspacesByUserId, updateWorkspaceWithFilter, workspacesCreatedByUser } from "@/services/db/workspace";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { _id: userId } = buildRequestPayload(request);
    if (!isValidObjectId(userId)) _throwError(
      401, "Bad Request: Invalid request"
    )

    const data = await findWorkspacesByUserId(userId)

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

    const workspaces = await workspacesCreatedByUser(userId)
    if (workspaces.length >= config.MAX_WORKSPACES_OWNERSHIP_USER) _throwError(
      400, "Bad Request: You have reached the maximum number of workspaces you can own."
    )

    await createWorkSpaceForUser(userId)

    return NextResponse.json({
      status_code: 200,
      message: "Successfull"
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error."
    }, { status: error.statusCode || 500 })
  }
}

export async function PUT(request) {
  try {
    const { _id: userId } = buildRequestPayload(request);
    if (!isValidObjectId(userId)) _throwError(
      401, "Bad Request: Invalid request"
    )

    const body = await request.json()

    await updateWorkspaceWithFilter({ owner: userId }, {
      name: body.name
    })


    return NextResponse.json({
      status_code: 200,
      message: "Successfull"
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error."
    }, { status: error.statusCode || 500 })
  }
}