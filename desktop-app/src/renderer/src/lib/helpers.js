export function _throwError(message = "Unknown Error Occurred!") {
  throw new Error(message)
}

export function copyText(text) {
  navigator.clipboard.writeText(text)
}