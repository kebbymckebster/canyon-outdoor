import { describe, expect, it } from "vitest";
import { buildInquiryEmail, getEmailDeliveryConfig, getFormspreeEndpoint } from "./emailDelivery";

describe("inquiry email delivery configuration", () => {
  it("accepts a complete server-only email configuration", () => {
    expect(getEmailDeliveryConfig({ RESEND_API_KEY: "re_example_secret", RESEND_FROM_EMAIL: "hello@example.com", INQUIRY_RECIPIENT_EMAIL: "owner@example.com" } as NodeJS.ProcessEnv)).toEqual({ apiKey: "re_example_secret", from: "hello@example.com", to: "owner@example.com" });
  });

  it("rejects missing or malformed provider configuration", () => {
    expect(getEmailDeliveryConfig({ RESEND_API_KEY: "not-a-resend-key", RESEND_FROM_EMAIL: "bad", INQUIRY_RECIPIENT_EMAIL: "owner@example.com" } as NodeJS.ProcessEnv)).toBeNull();
  });

  it("retains the configured recipient only in the server environment", () => {
    expect(process.env.INQUIRY_RECIPIENT_EMAIL).toMatch(/^\S+@\S+\.\S+$/);
  });

  it("accepts a valid server-only Formspree endpoint", () => {
    expect(getFormspreeEndpoint({ FORMSPREE_ENDPOINT: "https://formspree.io/f/xljrpqwj" } as NodeJS.ProcessEnv)).toBe("https://formspree.io/f/xljrpqwj");
    expect(getFormspreeEndpoint({ FORMSPREE_ENDPOINT: "http://example.com/form" } as NodeJS.ProcessEnv)).toBeNull();
  });

  it("escapes inquiry text in the rendered notification", () => {
    const message = buildInquiryEmail({ requestedServices: ["Landscape design"], propertyType: "Residential", location: "Costa Mesa", projectDetails: "<script>alert(1)</script>", name: "Taylor", email: "taylor@example.com" });
    expect(message.html).not.toContain("<script>");
    expect(message.text).toContain("Costa Mesa");
  });
});
