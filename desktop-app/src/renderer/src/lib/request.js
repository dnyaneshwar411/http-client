export function buildUrlWithQueryParams(baseUrl, paramsObject = {}) {
  if (Object.keys(paramsObject).length === 0) return baseUrl

  const query = Object.entries(paramsObject)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  return baseUrl.includes("?") ? `${baseUrl}&${query}` : `${baseUrl}?${query}`;
}