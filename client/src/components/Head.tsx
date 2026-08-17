import { useEffect } from "react";
import { useLocation } from "wouter";
import { headForPath } from "@/ssr/siteMeta";

/** Keeps the document title accurate after client-side route navigation following server-rendered first paint. */
export function Head() {
  const [location] = useLocation();
  useEffect(() => { document.title = headForPath(location).title; }, [location]);
  return null;
}
