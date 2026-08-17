import { hydrateRoot } from "react-dom/client";
import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { Router } from "wouter";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "@shared/const";
import App from "./App";
import { startLogin } from "./const";
import "./index.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } });
const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError) || error.message !== UNAUTHED_ERR_MSG) return;
  startLogin();
};
queryClient.getQueryCache().subscribe(event => { if (event.type === "updated" && event.action.type === "error") { redirectToLoginIfUnauthorized(event.query.state.error); console.error("[API Query Error]", event.query.state.error); } });
queryClient.getMutationCache().subscribe(event => { if (event.type === "updated" && event.action.type === "error") { redirectToLoginIfUnauthorized(event.mutation.state.error); console.error("[API Mutation Error]", event.mutation.state.error); } });
const client = trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson, headers() { try { const raw = sessionStorage.getItem("manus-cookie"); const token = raw?.split(";").find(value => value.trim().startsWith(`${COOKIE_NAME}=`))?.trim().slice(COOKIE_NAME.length + 1); return token ? { Authorization: `Bearer ${token}` } : {}; } catch { return {}; } }, fetch(input, init) { return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" }); } })] });
const rawState = (window as Window & { __RQ_STATE__?: unknown }).__RQ_STATE__;
const state = rawState ? superjson.deserialize(rawState as Parameters<typeof superjson.deserialize>[0]) as DehydratedState : undefined;
hydrateRoot(document.getElementById("root")!, <trpc.Provider client={client} queryClient={queryClient}><QueryClientProvider client={queryClient}><HydrationBoundary state={state}><Router><App /></Router></HydrationBoundary></QueryClientProvider></trpc.Provider>);
