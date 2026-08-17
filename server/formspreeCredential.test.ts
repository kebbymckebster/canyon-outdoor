import { describe, expect, it } from "vitest";
import { getFormspreeEndpoint } from "./emailDelivery";

describe("Formspree endpoint", () => {
  it("responds to a lightweight verification request when configured", async () => {
    const endpoint = getFormspreeEndpoint();
    expect(endpoint).toBeTruthy();
    const response = await fetch(endpoint!, { method: "GET", headers: { Accept: "application/json" } });
    // Formspree may disallow GET for a form endpoint, but a configured endpoint must not resolve as a server error.
    expect(response.status).toBeLessThan(500);
  }, 15_000);
});
