import { shell } from "electron"
import keytar from "keytar"
import { toServer } from "../api"
import { mainWindow } from "../../main"
// import { BASE_URL } from "../../main/config/config"

// const BASE_URL = "https://xhttp-client.vercel.app"
const BASE_URL = "https://useful-ant-96.clerk.accounts.dev/oauth/authorize?redirect_url=" + "http://localhost:3000/api/auth/sign-in"

export function authenticateWeb() {
  const endpoint = `${BASE_URL}/auth/sign-in`
  shell.openExternal(endpoint)
}

export async function userLoggedIn() {
  const token = await getToken("access")
  return Boolean(token)
}

export async function unsetToken(token) {
  await keytar
    .deletePassword("xhttp-client@_authentication", token)
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
  if (!otp || otp.length !== 6) return {
    status_code: 400,
    message: "otp should be 6 digits long!"
  }

  const userId = await getToken("userId")

  if (!userId) return {
    status_code: 400,
    message: "user not found!"
  }

  const response = await toServer("auth/verify-otp", {
    body: {
      userId,
      otp
    }
  })

  if (response.status_code !== 200) return response

  const {
    data: {
      refresh,
      access
    }
  } = response


  await Promise.all([
    setToken("access", access),
    setToken("refresh", refresh)
  ])


  return {
    status_code: 200,
    message: "Success: logged in successfully."
  }
}