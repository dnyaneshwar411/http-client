import { buildUrlWithQueryParams } from "../../renderer/src/lib/request";
import { getToken, setToken, unsetToken } from "../authentication";

// const BASE_URL = "https://xhttp-client.vercel.app"
const BASE_URL = "http://localhost:3000"

async function buildToken(type) {
  switch (type) {
    case "access":
      return await getToken("access");
    case "refresh":
      return await getToken("refresh");
    default:
      throw new Error("Bad Request: token can either be access or refresh.")
  }
}

async function refreshAccessToken() {
  const response = await sendData(
    "/auth/token",
    { method: "POST" },
    "refresh"
  );

  if (response.status_code !== 200) return {
    status: 401,
    message: response.message
  }

  await setToken("refresh", response.token)
  return response;
}

async function fetchData(path, config = {}, type) {
  const token = await buildToken(type)
  console.log(type, token)
  const endpoint = buildUrlWithQueryParams(`${BASE_URL}/api/${path}`, config.params)
  const response = await fetch(endpoint, {
    headers: {
      credentials: "include",
      "authorization": `Bearer ${token}`
    }
  });
  return await response.json();
}

async function sendData(
  path,
  {
    method = "POST",
    body = {},
    params = {}
  },
  type
) {
  const token = await buildToken(type);
  console.log(type, token)
  const endpoint = buildUrlWithQueryParams(`${BASE_URL}/api/${path}`, params)
  const response = await fetch(endpoint, {
    method,
    headers: {
      credentials: "include",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}

export async function fromServer(...args) {
  try {
    let response1 = await fetchData(...args, "access")
    if (response1.status_code !== 401) return response1;

    const refreshedTokenData = await refreshAccessToken();
    console.log(refreshedTokenData)
    if (refreshedTokenData.status !== 401) return refreshedTokenData;


    const response2 = await fetchData(...args, "refresh");
    console.log(response2)
    if (response2.status_code !== 401) return response2;

    // await Promise.all([
    //   unsetToken("access"),
    //   unsetToken("refresh")
    // ])

    return response2;
  } catch (error) {
    console.error(error)
    return {
      status_code: 500,
      message: error.message || "Internal Server Error"
    }
  }
}


export async function toServer(...arg) {
  try {
    const response1 = await sendData(...arg, "access");
    if (response1.status_code === 200) return response1;


    const newTokenData = await refreshAccessToken();
    if (newTokenData.status === 200) return newTokenData;


    const response2 = await sendData(...arg, "refresh");
    if (response2.status_code === 200) return response2;

    // await Promise.all([
    //   unsetToken("access"),
    //   unsetToken("refresh")
    // ])

    return response2;
  } catch (error) {
    return {
      status_code: 500,
      message: error.message || "Internal Server Error"
    }
  }
}