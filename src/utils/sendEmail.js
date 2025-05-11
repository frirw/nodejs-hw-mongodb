import nodemailer from 'nodemailer';
import 'dotenv/config';

// import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const user = getEnvVar('SMTP_USER');
const pass = getEnvVar('SMTP_PASSWORD');
const host = getEnvVar('SMTP_HOST');
const port = parseInt(getEnvVar('SMTP_PORT'), 587);

const nodemailerConfig = {
  host,
  port,
  auth: {
    user,
    pass,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (data) => {
  const email = { ...data, from: user };
  return transport.sendMail(email);
};
