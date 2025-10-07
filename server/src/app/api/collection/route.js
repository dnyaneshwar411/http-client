"use server"
import { allSearchParams } from "@/lib/http-request";
import { createNewCollection, retrieveUserCollections, updateCollection } from "@/services/collection";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId, workspaceId } = allSearchParams(request.url)

    const data = await retrieveUserCollections(userId, workspaceId);

    return NextResponse.json({
      status_code: 200,
      data
    })
  } catch (error) {
    return NextResponse.json({
      status_code: error.statusCode || 500,
      message: error.message || "Internal Server Error!"
    })
  }
}

export async function POST(request) {
  try {
    const { userId, workspaceId, ...body } = await request.json()

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