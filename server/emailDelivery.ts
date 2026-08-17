export type InquiryEmailPayload = {
  requestedServices: string[];
  propertyType: string;
  location: string;
  projectDetails: string;
  inspirationUrl?: string;
  name: string;
  email: string;
  phone?: string;
  bestContactTime?: string;
};

type DeliveryConfig = { apiKey: string; from: string; to: string };

export function getFormspreeEndpoint(env: NodeJS.ProcessEnv = process.env): string | null {
  const endpoint = env.FORMSPREE_ENDPOINT?.trim();
  if (!endpoint) return null;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:" || url.hostname !== "formspree.io" || !/^\/f\/[A-Za-z0-9]+$/.test(url.pathname)) return null;
    return url.toString();
  } catch { return null; }
}

export function getEmailDeliveryConfig(env: NodeJS.ProcessEnv = process.env): DeliveryConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.RESEND_FROM_EMAIL?.trim();
  const to = env.INQUIRY_RECIPIENT_EMAIL?.trim();
  if (!apiKey || !from || !to) return null;
  if (!/^re_[A-Za-z0-9_]+$/.test(apiKey) || !/^\S+@\S+\.\S+$/.test(from) || !/^\S+@\S+\.\S+$/.test(to)) return null;
  return { apiKey, from, to };
}

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function buildInquiryEmail(payload: InquiryEmailPayload) {
  const text = [
    `New Canyon Outdoor inquiry from ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not supplied"}`,
    `Best time to connect: ${payload.bestContactTime || "Not supplied"}`,
    `Services: ${payload.requestedServices.join(", ")}`,
    `Property type: ${payload.propertyType}`,
    `Location: ${payload.location}`,
    `Reference link: ${payload.inspirationUrl || "Not supplied"}`,
    "",
    "Project details:",
    payload.projectDetails,
  ].join("\n");
  const rows = [
    ["Name", payload.name], ["Email", payload.email], ["Phone", payload.phone || "Not supplied"], ["Best time", payload.bestContactTime || "Not supplied"], ["Services", payload.requestedServices.join(", ")], ["Property type", payload.propertyType], ["Location", payload.location], ["Reference link", payload.inspirationUrl || "Not supplied"],
  ].map(([label, value]) => `<tr><th align="left" style="padding:8px 16px 8px 0;color:#1b2e20">${escapeHtml(label)}</th><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`).join("");
  const html = `<main style="font-family:Arial,sans-serif;color:#1d2b20;max-width:680px"><h1 style="color:#1b2e20">New Canyon Outdoor inquiry</h1><table>${rows}</table><h2 style="margin-top:28px;color:#1b2e20">Project details</h2><p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(payload.projectDetails)}</p></main>`;
  return { subject: `New inquiry from ${payload.name} | Canyon Outdoor`, text, html };
}

export async function deliverInquiryEmail(payload: InquiryEmailPayload, send: typeof fetch = fetch, env: NodeJS.ProcessEnv = process.env) {
  const formspreeEndpoint = getFormspreeEndpoint(env);
  if (formspreeEndpoint) {
    const message = buildInquiryEmail(payload);
    const response = await send(formspreeEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ _subject: message.subject, name: payload.name, email: payload.email, phone: payload.phone || "", bestContactTime: payload.bestContactTime || "", requestedServices: payload.requestedServices.join(", "), propertyType: payload.propertyType, location: payload.location, projectDetails: payload.projectDetails, inspirationUrl: payload.inspirationUrl || "" }),
    });
    if (!response.ok) throw new Error(`Form delivery response: ${response.status}`);
    return { configured: true, delivered: true } as const;
  }
  const config = getEmailDeliveryConfig(env);
  if (!config) return { configured: false, delivered: false } as const;
  const message = buildInquiryEmail(payload);
  const response = await send("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: config.from, to: [config.to], reply_to: payload.email, ...message }),
  });
  if (!response.ok) throw new Error(`Email provider response: ${response.status}`);
  return { configured: true, delivered: true } as const;
}
