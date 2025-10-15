import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_EMAIL,
  secure: true,
  port: process.env.SERVICE_EMAIL_PORT,
  auth: {
    user: process.env.SERVICE_EMAIL_USER,
    pass: process.env.SERVICE_EMAIL_PASSWORD,
  },
});