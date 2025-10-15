"use server"
import { verifyAcessToken } from "./token"

export async function validateUser(req) {
  const authorizationHeader = req.headers.get("authorization")
  if (!authorizationHeader) return { status: "logged-out" }

  const accessToken = authorizationHeader.split(" ")[1];

  return await verifyAcessToken(accessToken);
}