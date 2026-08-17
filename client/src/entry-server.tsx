import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import { Router } from "wouter";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import App from "./App";
import { headForPath } from "./ssr/siteMeta";

export function render(url: string) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } });
  const client = trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })] });
  const separator = url.indexOf("?");
  const ssrPath = separator === -1 ? url : url.slice(0, separator);
  const ssrSearch = separator === -1 ? "" : url.slice(separator + 1);
  const html = renderToString(<trpc.Provider client={client} queryClient={queryClient}><QueryClientProvider client={queryClient}><Router ssrPath={ssrPath} ssrSearch={ssrSearch}><App /></Router></QueryClientProvider></trpc.Provider>);
  return { html, dehydratedState: dehydrate(queryClient), head: headForPath(url) };
}
