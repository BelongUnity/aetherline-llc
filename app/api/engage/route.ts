import { NextResponse } from "next/server";

const CONTACT_TO = process.env.CONTACT_TO ?? "cancolak666@icloud.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Aetherline <beth.t@example.com>";

type EngageBody = {
  name: string;
  email: string;
  message: string;
};

function readEngage(form: FormData): EngageBody | null {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  if (!name || !email || !message) {
    return null;
  }
  return { name, email, message };
}

async function sendResend(payload: EngageBody): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { ok: false, error: "RESEND_API_KEY is not set." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: payload.email,
      subject: `Engage: ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return { ok: false, error: detail.slice(0, 400) };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  const form = await request.formData();
  const payload = readEngage(form);
  if (!payload) {
    return NextResponse.json({ ok: false, error: "Missing fields." }, { status: 400 });
  }

  const sent = await sendResend(payload);
  if (!sent.ok) {
    return NextResponse.json(
      { ok: false, error: sent.error ?? "Mail failed." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, to: CONTACT_TO });
}
