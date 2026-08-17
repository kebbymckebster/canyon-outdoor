import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { consumeRateLimit, logSecurityEvent, requestFingerprint } from "./security";
import { deliverInquiryEmail } from "./emailDelivery";

const cleanText = (max: number) => z.string().trim().min(1).max(max).transform(value => value.replace(/[<>]/g, "").replace(/\s+/g, " "));
const optionalText = (max: number) => z.string().trim().max(max).transform(value => value.replace(/[<>]/g, "").replace(/\s+/g, " ")).optional().or(z.literal(""));
export const inquiryInput = z.object({
  requestedServices: z.array(z.enum(["Landscape design", "Outdoor living", "Hardscape concept", "Backyard transformation", "Property visualization", "Not sure yet"])).min(1).max(6),
  propertyType: z.enum(["Residential", "Commercial", "Other"]),
  location: cleanText(160),
  projectDetails: cleanText(2000),
  inspirationUrl: z.string().url().max(2048).optional().or(z.literal("")),
  name: cleanText(120),
  email: z.string().trim().email().max(320).transform(value => value.toLowerCase()),
  phone: z.string().trim().regex(/^[+()0-9.\-\s]{0,32}$/).optional().or(z.literal("")),
  bestContactTime: optionalText(120),
}).strict();

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  inquiry: router({
    submit: publicProcedure.input(inquiryInput).mutation(async ({ ctx, input }) => {
      const fingerprint = requestFingerprint(ctx.req); const memoryLimit = consumeRateLimit("inquiry", fingerprint, 5, 15 * 60_000);
      if (!memoryLimit.allowed) { logSecurityEvent("security.rate_limited", { scope: "inquiry", fingerprint }); throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many inquiry attempts. Please try again later." }); }
      const priorCount = await db.countRecentInquiries(fingerprint, new Date(Date.now() - 15 * 60_000));
      if (priorCount >= 5) { logSecurityEvent("security.rate_limited", { scope: "inquiry_persistent", fingerprint }); throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many inquiry attempts. Please try again later." }); }
      try {
        await db.createInquiry({ name: input.name, email: input.email, phone: input.phone || null, bestContactTime: input.bestContactTime || null, requestedServices: input.requestedServices.join(", "), propertyType: input.propertyType, location: input.location, projectDetails: input.projectDetails, inspirationUrl: input.inspirationUrl || null, requestFingerprint: fingerprint });
        try {
          const delivery = await deliverInquiryEmail(input);
          logSecurityEvent(delivery.delivered ? "inquiry.email_delivered" : "inquiry.email_not_configured", { fingerprint, serviceCount: input.requestedServices.length });
        } catch (emailError) {
          logSecurityEvent("inquiry.email_delivery_failed", { fingerprint, errorType: emailError instanceof Error ? emailError.name : "unknown" });
        }
        logSecurityEvent("inquiry.accepted", { fingerprint, serviceCount: input.requestedServices.length }); return { success: true } as const;
      } catch (error) { logSecurityEvent("api.error", { route: "inquiry.submit", fingerprint, errorType: error instanceof Error ? error.name : "unknown" }); throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "We could not send the inquiry. Please try again later." }); }
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
