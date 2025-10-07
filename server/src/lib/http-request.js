export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function _throwError(code, message) {
  throw new CustomError(code, message)
}

export function handleError(res, error) {
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    status_code: error.statusCode || 500
  });
}

export function allSearchParams(url) {
  const { searchParams } = new URL(url)
  const accumulator = {}
  for (const [key, value] of searchParams.entries()) {
    accumulator[key] = value
  }
  return accumulator;
}