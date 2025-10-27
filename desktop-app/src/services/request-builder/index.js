import { buildUrlWithQueryParams } from "../../renderer/src/lib/request";

export async function sendRequestAtURL(config) {
  console.log(config)
  const endpoint = buildRequestURL(config.url.value, config.params.values)

  const body = buildRequestBody(config.body)
  const headers = buildRequestHeaders(config.headers)

  /**
   * build the headers for the authorization
   * "Authorization": "Bearer [TOKEN]"
   */
  headers.append(
    "Authorization",
    buildAuthObject(config.authorization)
  )

  headers.append(
    "Content-Type",
    "application/json"
  )

  const request = new Request(endpoint, {
    method: config.method.value,
    body: body,
    headers,
    credentials: "include",
  });

  const response = await fetch(request)
  console.log(response)
  const data = await response.text()
  return {
    data,
    headers: Object(response.headers),
    status: response.status,
    statusText: response.statusText,
    redirected: response.redirected,
    type: response.type,
    url: response.url,
    ok: response.ok
  };
}

export function buildRequestURL(endpoint, paramsList) {
  const params = paramsList
    .filter(param => param.selected)
    .reduce((acc, param) => ({
      ...acc,
      [param.name]: param.value
    }), {})
  return buildUrlWithQueryParams(endpoint, params)
}

export function buildRequestBody(body) {
  switch (body.selected) {

    case "none":
      return undefined;

    case "form-data": {
      const payload = new FormData();

      const entries = body
        .formData
        .values
        .filter(entry => entry.selected);

      for (const field of entries) {
        if (field.type === "text") {
          payload.append(field.name, field.value)
        }

        else if (field.type === "file") {
          payload.append(field.name, field.file)
        }
      }

      return payload;
    }

    case "json": {
      return body.json.values
    }

    default:
      break;
  }
}

export function buildRequestHeaders(headersList) {
  const headers = new Headers();

  const selectedHeaders = headersList
    .values
    .filter(header => header.selected)

  /**
   * Select all the headers that are set by the user
   * "Content-Type": "application/json"
   */
  for (const header of selectedHeaders) {
    headers.append(header.name, header.value)
  }

  /**
   * set default headers that are not set by the user
   * but are required during a fetch request over network
   * e.g. "Content-Security-Policy": "default-src '*'; img-src 'self' example.com"
   */

  return headers
}

export function buildAuthObject(authorization) {
  switch (authorization.selected) {
    case "bearer": {
      return `Bearer ${authorization.bearer.value}`
    }
    case "basic": {
      return `Basic ${authorization.basic.value.username}:${authorization.basic.value.password}`
    }

    default:
      return "";
  }
}