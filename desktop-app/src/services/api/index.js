import { buildUrlWithQueryParams } from "../../renderer/src/lib/request";

// const BASE_URL = "https://xhttp-client.vercel.app"
const BASE_URL = "http://localhost:3000"

export async function fetchData(path, config = {}) {
  try {
    const token = '';
    const endpoint = buildUrlWithQueryParams(`${BASE_URL}/api/${path}`, config.params)
    const response = await fetch(endpoint, {
      headers: {
        credentials: "include",
        "authorization": `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    return {
      status_code: 500,
      message: error.message || "Internal Server Error"
    }
  }
}


export async function sendData(path, {
  method = "POST",
  body = {},
  params = {}
}) {
  try {
    console.log(body)
    const token = '';
    const endpoint = buildUrlWithQueryParams(`${BASE_URL}/api/${path}`, params)
    const response = await fetch(endpoint, {
      method,
      headers: {
        credentials: "include",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data
  } catch (error) {
    return {
      status_code: 500,
      message: error.message || "Internal Server Error"
    }
  }
}