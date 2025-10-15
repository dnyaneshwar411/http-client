import { shell } from "electron"
import keytar from "keytar"
import { sendData } from "../api"
import { mainWindow } from "../../main"
// import { BASE_URL } from "../../main/config/config"

// const BASE_URL = "https://xhttp-client.vercel.app"
const BASE_URL = "https://useful-ant-96.clerk.accounts.dev/oauth/authorize?redirect_url=" + "http://localhost:3000/api/auth/sign-in"

export function authenticateWeb() {
  const endpoint = `${BASE_URL}/auth/sign-in`
  console.log(endpoint)
  shell.openExternal(endpoint)
}

export async function userLoggedIn() {
  const token = await getToken("token")
  console.log(token)
  return Boolean(token)
}

export async function expireSession() {
  await keytar.deletePassword("xhttp-client@_authentication", "token")
}

export async function setToken(key, code) {
  return await keytar
    .setPassword("xhttp-client@_authentication", key, code)
}

export async function getToken(key) {
  return await keytar
    .getPassword("xhttp-client@_authentication", key)
}

export async function openURLSteps(endpoint) {
  if (!endpoint.startsWith("xhttpclient://authorize")) return

  if (await userLoggedIn()) return

  const code = endpoint.split("code=")[1]

  await setToken("userId", code)
}


export async function createUserSession(otp) {
  console.log("condition hit", otp)
  if (!otp || otp.length !== 6) return {
    status_code: 400,
    message: "otp should be 6 digits long!"
  }

  const userId = await getToken("userId")
  console.log(userId)

  if (!userId) return {
    status_code: 400,
    message: "user not found!"
  }

  const response = await sendData("auth/verify-otp", {
    body: {
      userId,
      otp
    }
  })

  return response;
}