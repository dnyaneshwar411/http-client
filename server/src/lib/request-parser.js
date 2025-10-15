export function buildRequestPayload(request) {
  return JSON.parse(request.headers.get("x-jwt-payload"))
}