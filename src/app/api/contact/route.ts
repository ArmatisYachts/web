import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ARMATIS_107 } from "@/lib/yacht";

export const runtime = "nodejs";

function esc(s: unknown) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const firstName = String(data.firstName ?? "").trim();
  const lastName = String(data.lastName ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const enquiryType = String(data.enquiryType ?? "").trim();
  const message = String(data.message ?? "").trim();
  const gdpr = data.gdpr === true;

  if (!firstName || !lastName || !email || !enquiryType || !message || !gdpr) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const resend = new Resend(key);

  try {
    const { error } = await resend.emails.send({
      from: `ARMATIS Yachts <${ARMATIS_107.email}>`,
      to: [ARMATIS_107.email],
      replyTo: email,
      subject: `New enquiry — ${enquiryType} — ${fullName}`,
      text:
        `Name: ${fullName}\n` +
        `E-mail: ${email}\n` +
        `Phone: ${phone || "—"}\n` +
        `Enquiry type: ${enquiryType}\n\n` +
        `Message:\n${message}\n\n` +
        `Consent: yes`,
      html:
        `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0e0e0e;line-height:1.6">` +
        `<h2 style="font-weight:400;letter-spacing:.04em">New enquiry — ${esc(enquiryType)}</h2>` +
        `<p><strong>Name:</strong> ${esc(fullName)}</p>` +
        `<p><strong>E-mail:</strong> ${esc(email)}</p>` +
        `<p><strong>Phone:</strong> ${esc(phone || "—")}</p>` +
        `<p><strong>Enquiry type:</strong> ${esc(enquiryType)}</p>` +
        `<p><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>")}</p>` +
        `<p style="color:#6b6b68">Consent given via website form.</p>` +
        `</div>`,
    });

    if (error) {
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
