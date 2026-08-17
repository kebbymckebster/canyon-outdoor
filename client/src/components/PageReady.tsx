import { useEffect } from "react";

/** Removes the static, accessible ghost shell only after the initial page and hero are ready to be shown. */
export function PageReady() {
  useEffect(() => {
    const loader = document.getElementById("page-loader");
    if (!loader) return;
    let cancelled = false;
    const dismiss = () => {
      if (cancelled) return;
      loader.classList.add("page-loader--hidden");
      window.setTimeout(() => loader.remove(), 260);
    };
    const imageReady = (image: HTMLImageElement) => new Promise<void>(resolve => {
      if (image.complete) return resolve();
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    });
    const waitForRoute = async () => {
      if (document.readyState !== "complete") {
        await new Promise<void>(resolve => window.addEventListener("load", () => resolve(), { once: true }));
      }
      // Deferred gallery images intentionally stay out of this promise so an off-screen image can never trap the shell.
      const initialImages = Array.from(document.images).filter(image => image.loading !== "lazy");
      await Promise.all(initialImages.map(imageReady));
      window.requestAnimationFrame(dismiss);
    };
    void waitForRoute();
    return () => { cancelled = true; };
  }, []);
  return null;
}
