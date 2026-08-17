import { describe, expect, it } from "vitest";
import { inquiryInput } from "./routers";
import { consumeRateLimit } from "./security";

describe("inquiry security controls", () => {
  const validInquiry = {
    requestedServices: ["Landscape design"], propertyType: "Residential", location: "Costa Mesa, CA", projectDetails: "A garden-focused outdoor space with a pool and fire feature.", inspirationUrl: "", name: "Jordan Lee", email: "jordan@example.com", phone: "", bestContactTime: "",
  };

  it("rejects unknown fields and malformed email input", () => {
    expect(() => inquiryInput.parse({ ...validInquiry, email: "not-an-email" })).toThrow();
    expect(() => inquiryInput.parse({ ...validInquiry, unexpected: "ignored?" })).toThrow();
  });

  it("normalizes text while preserving typed safe fields", () => {
    const parsed = inquiryInput.parse({ ...validInquiry, name: "  Jordan   Lee  ", projectDetails: "<script>alert(1)</script> Outdoor concept" });
    expect(parsed.name).toBe("Jordan Lee");
    expect(parsed.projectDetails).not.toContain("<");
  });

  it("blocks requests after a scoped limit is exceeded", () => {
    const key = `test-${Date.now()}`;
    expect(consumeRateLimit("test", key, 2, 60_000).allowed).toBe(true);
    expect(consumeRateLimit("test", key, 2, 60_000).allowed).toBe(true);
    expect(consumeRateLimit("test", key, 2, 60_000).allowed).toBe(false);
  });
});
