export function charSplit(str, { words, characters = 50 } = {}) {
  if (!str || typeof str !== "string") return "";

  if (words) {
    const wordArray = str.trim().split(/\s+/);
    const chunks = wordArray.slice(0, words);
    if (chunks.length < wordArray.length) chunks.push("..")
    return chunks.join(" ");
  }

  const chunks = [];
  for (let i = 0; i < str.length; i += characters) {
    chunks.push(str.slice(i, i + characters));
  }

  return chunks.join(" ");
}
