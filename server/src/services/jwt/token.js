import * as jose from "jose";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION

const JWT_ALGORITHM = process.env.JWT_ALGORITHM


function buildSecret(secret) {
  switch (secret) {
    case "access":
      return new TextEncoder().encode(JWT_ACCESS_SECRET)
    case "refresh":
      return new TextEncoder().encode(JWT_REFRESH_SECRET)
    default:
      throw new Error("invalid token secret type")
  }
}


function buildJWTVerificationError(message) {
  switch (message) {
    case "signature verification failed":
      return "Bad Request: The provided access token is malformed."
    case '"exp" claim timestamp check failed':
      return "Bad Request: The provided access token is expired"
    default:
      return message;
  }
}


export async function signAccessToken(data) {
  const payload = {
    ...data,
    exp: Math.floor(Date.now() / 1000) + (15)
  }

  const SECRET = buildSecret("access")

  return await new jose
    .SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(JWT_ACCESS_EXPIRATION)
    .sign(SECRET)
}


export async function verifyAcessToken(TOKEN) {
  try {
    const SECRET = buildSecret("access")

    return await jose.jwtVerify(TOKEN, SECRET)
  } catch (error) {
    const message = buildJWTVerificationError(error.message)
    return {
      status: "malformed-access-token",
      message: message
    }
  }
}



export async function signRefreshToken() {
  const payload = {
    ...data,
    exp: Math.floor(Date.now() / 1000) + (15)
  }

  const SECRET = buildSecret("refresh")

  return await new jose
    .SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(JWT_REFRESH_EXPIRATION)
    .sign(SECRET)
}


export async function verifyRefreshToken(TOKEN) {
  try {
    const SECRET = buildSecret("refresh")

    return await jose.jwtVerify(TOKEN, SECRET)
  } catch (error) {
    return {
      status: "malformed-refresh-token",
      message: error.message
    }
  }
}