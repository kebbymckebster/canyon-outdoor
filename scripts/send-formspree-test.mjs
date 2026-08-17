const endpoint = process.env.FORMSPREE_ENDPOINT;
if (!endpoint) throw new Error("FORMSPREE_ENDPOINT is not configured");

const response = await fetch(endpoint, {
  method: "POST",
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  body: JSON.stringify({
    _subject: "Canyon Outdoor form delivery test — please ignore",
    name: "Canyon Outdoor automated test",
    email: "no-reply@canyonoutdoor.test",
    requestedServices: "Delivery configuration test only",
    propertyType: "Other",
    location: "Test only",
    projectDetails: "This is a one-time, clearly labeled delivery test submitted with owner confirmation. No response is needed.",
  }),
});

if (!response.ok) throw new Error(`Formspree test failed with HTTP ${response.status}`);
console.log("Formspree accepted the confirmed test inquiry.");
