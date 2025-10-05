import { buildAuthObject, buildRequestBody, buildRequestHeaders, buildRequestURL } from "../../../services/request-builder";

export function generateCurl({
  method = "GET",
  url,
  headers = {},
  body,
  params = {},
  authorization,
  cookies = {},
}) {
  const endpoint = buildRequestURL(url, params);

  const headersList = buildRequestHeaders({
    ...headers,
    values: headers
      .values
      .filter(header => header.includeInSnippet)
  })

  let headerString = "";

  for (const [key, value] of headersList.entries()) {
    headerString += `\n--header ${key}: ${value} \\`
  }

  const authenticationString = generatecURLAuthString(authorization);

  const bodyString = generatecURLDataString(body);

  const curlCommand = `curl -X ${method.toUpperCase()} --location "${endpoint}" \\${headerString}${authenticationString}${bodyString}`.trim();

  return curlCommand;
}

function generatecURLDataString(body) {
  const payload = buildRequestBody(body)
  switch (body.selected) {
    case "none":
      return ""
    case "form-data": {
      let bodyString = "\n--form '"
      for (const [key, value] of payload.entries()) {
        if ((typeof value).toLowerCase() === "string") {
          bodyString += `${key}=${value}; `
        }
        else {
          bodyString += `${key}=${URL.createObjectURL(value)}; `
        }
      }
      bodyString += "'"
      return bodyString;
    }
    case "json": {
      return `\n--data '${payload}'`
    }
    default:
      return "";
  }
}

function generatecURLAuthString(auth) {
  const authOptions = buildAuthObject(auth);
  switch (auth.selected) {
    case "bearer":
      return `\n--header 'Authorization: ${authOptions}'`
    case "basic":
      return `\n--header 'Authorization: ${authOptions}'`
    default:
      return ""
  }
}




// fetch javascript
export function generateJSFetch({
  method = "GET",
  url,
  headers = {},
  body,
  params = {},
  authorization,
  cookies = {},
}) {
  const endpoint = buildRequestURL(url, params);

  const headersList = buildRequestHeaders({
    ...headers,
    values: headers.values.filter(header => header.includeInSnippet),
  });

  const authHeader = buildAuthObject(authorization);
  if (authorization?.selected === "bearer" && authHeader) {
    headersList.set("Authorization", authHeader);
  }

  // Convert headers to JS object string
  let headersString = "{\n";
  for (const [key, value] of headersList.entries()) {
    headersString += `    "${key}": "${value}",\n`;
  }
  headersString += "  }";

  // Build body
  let bodyString = "";
  const payload = buildRequestBody(body);

  switch (body.selected) {
    case "none":
      break;
    case "form-data": {
      bodyString = "const formData = new FormData();\n";
      for (const [key, value] of payload.entries()) {
        bodyString += `formData.append("${key}", ${JSON.stringify(value)});\n`;
      }
      break;
    }
    case "json": {
      bodyString = `const body = JSON.stringify(${payload});\n`;
      break;
    }
  }

  // Build Fetch snippet
  const fetchSnippet = `
${bodyString ? bodyString + "\n" : ""}fetch("${endpoint}", {
  method: "${method.toUpperCase()}",
  headers: ${headersString},
  ${body.selected === "form-data" ? "body: formData," : body.selected === "json" ? "body," : ""}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
`.trim();
  return fetchSnippet;
}



export function generateJSAxios({
  method = "GET",
  url,
  headers = {},
  body,
  params = {},
  authorization,
  cookies = {},
}) {
  const endpoint = buildRequestURL(url, params);

  const headersList = buildRequestHeaders({
    ...headers,
    values: headers.values.filter(header => header.includeInSnippet),
  });

  const authHeader = buildAuthObject(authorization);
  if (authorization?.selected === "bearer" && authHeader) {
    headersList.set("Authorization", authHeader);
  }

  // Convert headers to JS object string
  let headersString = "{\n";
  for (const [key, value] of headersList.entries()) {
    headersString += `    "${key}": "${value}",\n`;
  }
  headersString += "  }";

  // Build body section
  const payload = buildRequestBody(body);
  let bodyString = "";
  let bodyVariable = "";

  switch (body.selected) {
    case "none":
      break;

    case "form-data": {
      bodyVariable = "formData";
      bodyString = "const formData = new FormData();\n";
      for (const [key, value] of payload.entries()) {
        bodyString += `formData.append("${key}", ${JSON.stringify(value)});\n`;
      }
      break;
    }

    case "json": {
      bodyVariable = "data";
      bodyString = `const data = ${payload};\n`;
      break;
    }

    default:
      break;
  }

  // Construct Axios snippet
  const axiosSnippet = `
import axios from "axios";

${bodyString ? bodyString + "\n" : ""}const options = {
  method: "${method.toUpperCase()}",
  url: "${endpoint}",
  headers: ${headersString},
  ${bodyVariable ? `data: ${bodyVariable},` : ""}
};

axios.request(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
`.trim();

  return axiosSnippet;
}




export function generateJSXHR({
  method = "GET",
  url,
  headers = {},
  body,
  params = {},
  authorization,
  cookies = {},
}) {
  const endpoint = buildRequestURL(url, params);

  const headersList = buildRequestHeaders({
    ...headers,
    values: headers.values.filter(header => header.includeInSnippet),
  });

  const authHeader = buildAuthObject(authorization);
  if (authorization?.selected === "bearer" && authHeader) {
    headersList.set("Authorization", authHeader);
  }

  // Build body
  const payload = buildRequestBody(body);
  let bodyString = "";
  let bodyVariable = "";

  switch (body.selected) {
    case "none":
      break;

    case "form-data": {
      bodyVariable = "formData";
      bodyString = "const formData = new FormData();\n";
      for (const [key, value] of payload.entries()) {
        bodyString += `formData.append("${key}", ${JSON.stringify(value)});\n`;
      }
      break;
    }

    case "json": {
      bodyVariable = "data";
      bodyString = `const data = JSON.stringify(${payload});\n`;
      break;
    }

    default:
      break;
  }

  // Build snippet
  let xhrSnippet = `
const xhr = new XMLHttpRequest();
xhr.open("${method.toUpperCase()}", "${endpoint}");
`.trim();

  // Add headers
  for (const [key, value] of headersList.entries()) {
    xhrSnippet += `\nxhr.setRequestHeader("${key}", "${value}");`;
  }

  xhrSnippet += `

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error('Request failed with status', xhr.status);
  }
};

xhr.onerror = function() {
  console.error('Network error occurred');
};

${bodyString ? bodyString + "\n" : ""}xhr.send(${bodyVariable || "null"});
`.trim();

  return xhrSnippet;
}



export function generateNodeJSNative({
  method = "GET",
  url,
  headers = {},
  body,
  params = {},
  authorization,
  cookies = {},
}) {
  const endpoint = buildRequestURL(url, params);

  const headersList = buildRequestHeaders({
    ...headers,
    values: headers.values.filter(header => header.includeInSnippet),
  });

  const authHeader = buildAuthObject(authorization);
  if (authorization?.selected === "bearer" && authHeader) {
    headersList.set("Authorization", authHeader);
  }

  // Build headers object string
  let headersString = "{\n";
  for (const [key, value] of headersList.entries()) {
    headersString += `    "${key}": "${value}",\n`;
  }
  headersString += "  }";

  // Build body section
  const payload = buildRequestBody(body);
  let bodyString = "";
  let bodyVariable = "";

  switch (body.selected) {
    case "none":
      break;

    case "form-data": {
      bodyVariable = "formData";
      bodyString = "const formData = new FormData();\n";
      for (const [key, value] of payload.entries()) {
        bodyString += `formData.append("${key}", ${JSON.stringify(value)});\n`;
      }
      break;
    }

    case "json": {
      bodyVariable = "data";
      bodyString = `const data = JSON.stringify(${payload});\n`;
      break;
    }

    default:
      break;
  }

  const nodeHttpSnippet = `
import ${url.startsWith("https") ? "https" : "http"} from "${url.startsWith("https") ? "https" : "http"}";

${bodyString ? bodyString + "\n" : ""}const options = {
  method: "${method.toUpperCase()}",
  headers: ${headersString},
};

const req = ${url.startsWith("https") ? "https" : "http"}.request("${endpoint}", options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      console.log(JSON.parse(data));
    } catch {
      console.log(data);
    }
  });
});

req.on("error", (error) => {
  console.error("Error:", error);
});

${bodyVariable ? `req.write(${bodyVariable});` : ""}
req.end();
`.trim();

  return nodeHttpSnippet;
}