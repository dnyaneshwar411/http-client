export const createOTP = function ({ dummy }) {
  if (dummy) return 123456
  return Math.floor(Math.random() * 1000000)
}