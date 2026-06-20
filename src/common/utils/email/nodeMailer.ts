import nodemailer, { type Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer/index.js';
import { sendOtp } from './email.templetes.js';
import { HttpException } from '@nestjs/common';

// 
const transport: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_APP_SENDER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

export async function sendMail({
  to,
  subject,
  data,
}: {
  to: string;
  subject: string;
  data: any;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await transport
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .sendMail({
      from: process.env.MAIL_APP_SENDER,
      to,
      subject,
      html: sendOtp(data),
    } as Mail.Options)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .catch(() => {
      throw new HttpException('error in sending email', 400);
    });
}

export const generateOtp = () => {
  return Math.floor(Math.random() * 100000);
};
