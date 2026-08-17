import { describe, expect, it } from "vitest";

describe("Resend credential", () => {
  it("is accepted by the Resend account endpoint when configured", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey).toMatch(/^re_[A-Za-z0-9_]+$/);
    const response = await fetch("https://api.resend.com/domains", { headers: { Authorization: `Bearer ${apiKey}` } });
    expect(response.ok).toBe(true);
  }, 15_000);
});
