import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

const client = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4101/api/trpc",
      transformer: superjson,
    }),
  ],
});

const result = await client.inquiry.submit.mutate({
  requestedServices: ["Property visualization"],
  propertyType: "Other",
  location: "Automated validation only",
  projectDetails: "Clearly labeled one-time delivery validation submitted with owner confirmation. Please ignore this test record.",
  inspirationUrl: "",
  name: "Canyon Outdoor delivery validation",
  email: "no-reply@canyonoutdoor.test",
  phone: "",
  bestContactTime: "",
});

if (!result.success) throw new Error("The inquiry procedure did not return a success response");
console.log("The server inquiry procedure accepted the confirmed test submission.");
