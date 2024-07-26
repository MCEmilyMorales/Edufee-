import * as nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'paymyacademic@gmail.com',
    pass: process.env.PASSWORD_APP,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(() => {
  console.log('Ready to send emails =)');
});
