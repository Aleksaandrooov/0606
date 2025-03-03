import nodemailer from 'nodemailer'

export const sendEmailVerificed = async ({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.timeweb.ru',
    port: 587,
    secure: false,
    auth: {
      user: process.env.PROCESS_USER || '',
      pass: process.env.PROCESS_PASS || '',
    },
  })
  try {
    const info = await transporter.sendMail({
      from: 'shop@0606.store',
      to,
      subject,
      html,
    })
    console.log(info)
    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error()
  }
}
