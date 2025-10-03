export const methods = [
  { id: 1, name: "GET", value: "GET" },
  { id: 2, name: "POST", value: "POST" },
  { id: 3, name: "PUT", value: "PUT" },
  { id: 4, name: "PATCH", value: "PATCH" },
  { id: 5, name: "DELETE", value: "DELETE" },
  { id: 6, name: "HEAD", value: "HEAD" },
  { id: 7, name: "OPTIONS", value: "OPTIONS" },
  { id: 8, name: "CONNECT", value: "CONNECT" },
  { id: 9, name: "TRACE", value: "TRACE" }
];

export const requestConfigs = [
  { id: 1, name: "Params", value: "params" },
  { id: 2, name: "Authorization", value: "authorization" },
  { id: 3, name: "Headers", value: "headers" },
  { id: 4, name: "Body", value: "body" },
  // { id: 3, name: "Scripts", value: "scripts" },
  // { id: 3, name: "Scripts", value: "scripts" },
]

export const authorizationOptions = [
  // { id: 1, name: "Inherit auth from parent", value: "inherit" },
  { id: 2, name: "No Auth", value: "noauth" },
  { id: 3, name: "Basic Auth", value: "basic" },
  { id: 4, name: "Bearer Token", value: "bearer" },
  // { id: 5, name: "JWT Bearer", value: "jwt" },
  // { id: 6, name: "Digest Auth", value: "digest" },
  // { id: 7, name: "OAuth 1.0", value: "oauth1" },
  // { id: 8, name: "OAuth 2.0", value: "oauth2" },
  // { id: 9, name: "Hawk Authentication", value: "hawk" },
  // { id: 10, name: "AWS Signature", value: "awssig" },
  // { id: 11, name: "NTLM Authentication", value: "ntlm" },
  // { id: 12, name: "API Key", value: "apikey" },
  // { id: 13, name: "Akamai EdgeGrid", value: "akamai" },
  // { id: 14, name: "ASAP (Atlassian)", value: "asap" }
];


export const defaultHeaders = [
  { id: 1, selected: true, mandatory: true, name: "Cache-Control", value: "no-cache" },
  { id: 2, selected: true, mandatory: true, name: "Postman-Token", value: "<calculated when request is sent>" },
  { id: 3, selected: true, mandatory: false, name: "Host", value: "<calculated when request is sent>" },
  { id: 4, selected: true, mandatory: false, name: "User-Agent", value: "PostmanRuntime/7.46.0" },
  { id: 5, selected: true, mandatory: false, name: "Accept", value: "*/*" },
  { id: 6, selected: true, mandatory: false, name: "Accept-Encoding", value: "gzip, deflate, br" },
  { id: 7, selected: true, mandatory: false, name: "Connection", value: "keep-alive" }
];

export const requestBodyOptions = [
  { id: 1, name: "none", value: "none" },
  { id: 2, name: "form-data", value: "form-data" },
  // { id: 3, name: "x-www-form-urlencoded", value: "x-www-form-urlencoded" },
  { id: 4, name: "raw", value: "json" },
]

export const urlBodyPayloadFormDataInputTypes = [
  { id: 1, name: "Text", value: "text" },
  { id: 2, name: "File", value: "file" }
]