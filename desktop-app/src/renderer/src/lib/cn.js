function _flatten(input, out = []) {
  if (!input && input !== 0) return out; // skip null/undefined/false/true (true should be ignored)
  if (typeof input === "string" || typeof input === "number") {
    out.push(String(input));
    return out;
  }
  if (Array.isArray(input)) {
    for (const item of input) _flatten(item, out);
    return out;
  }
  if (typeof input === "object") {
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key) && input[key]) {
        out.push(key);
      }
    }
    return out;
  }
  return out;
}

/**
 * cn(...inputs) -> string
 * Accepts: string | number | Array | Object
 * Object example: { "text-red-500": hasError }
 */
export default function cn(...inputs) {
  const parts = [];
  for (const inp of inputs) _flatten(inp, parts);
  return parts.join(" ").trim();
}
