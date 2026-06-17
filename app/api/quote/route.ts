import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type QuoteRequest = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
};

const requiredEnvironment = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "QUOTE_TO_EMAIL",
] as const;

function getMissingEnvironment(): string[] {
  return requiredEnvironment.filter((value) => !process.env[value]);
}

export async function POST(request: Request) {
  const body = (await request.json()) as QuoteRequest;

  if (!body.name || !body.email || !body.company || !body.budget || !body.message) {
    return NextResponse.json(
      { message: "Please complete every field before submitting." },
      { status: 400 }
    );
  }

  const missingEnvironment = getMissingEnvironment();
  if (missingEnvironment.length > 0) {
    return NextResponse.json(
      { message: "Quote service is not configured yet." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.QUOTE_TO_EMAIL,
    replyTo: body.email,
    subject: `New quote request from ${body.company}`,
    text: `Name: ${body.name}
Email: ${body.email}
Company: ${body.company}
Budget: ${body.budget}

Project goals:
${body.message}`,
  });

  return NextResponse.json({ message: "Quote request sent." });
}
