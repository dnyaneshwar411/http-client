import { transporter } from "./transporter"

export const sendEmail = async function ({
  from,
  to,
  subject,
  text
}) {
  const email = await transporter
    .sendMail({
      from: from || process.env.SERVICE_EMAIL_FROM,
      to,
      subject,
      text
    })
}