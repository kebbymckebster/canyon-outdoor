import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";

const debugPort = 9224;
const profilePath = "/tmp/canyon-contact-modal-chromium";
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

await rm(profilePath, { recursive: true, force: true });
const browser = spawn("/usr/bin/chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profilePath}`,
  "about:blank",
], { stdio: "ignore" });

try {
  let targets;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then(response => response.json());
      if (targets.length) break;
    } catch { /* Chromium is still starting. */ }
    await delay(100);
  }
  const target = targets?.find(item => item.type === "page");
  if (!target?.webSocketDebuggerUrl) throw new Error("Chromium debugging target did not start");

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let sequence = 0;
  const responses = new Map();
  socket.addEventListener("message", event => {
    const payload = JSON.parse(String(event.data));
    const resolver = responses.get(payload.id);
    if (!resolver) return;
    responses.delete(payload.id);
    if (payload.error) resolver.reject(new Error(payload.error.message));
    else resolver.resolve(payload.result);
  });
  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    responses.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await command("Page.enable");
  await command("Page.navigate", { url: "http://localhost:3000/" });
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const state = await command("Runtime.evaluate", { expression: "document.readyState", returnByValue: true });
    if (state.result.value === "complete") break;
    await delay(100);
  }
  await command("Runtime.evaluate", { expression: "document.querySelector('button[aria-label=\"Open contact form\"]')?.click()" });
  await delay(250);
  const check = await command("Runtime.evaluate", {
    expression: `(() => {
      const heading = document.querySelector('h2#contact-dialog-title');
      const aside = document.querySelector('aside');
      const closeButton = document.querySelector('button[aria-label="Close contact form"]');
      return {
        modalOpen: Boolean(document.querySelector('[role="dialog"]')),
        headingColor: heading ? getComputedStyle(heading).color : null,
        asideColor: aside ? getComputedStyle(aside).color : null,
        closeButtonColor: closeButton ? getComputedStyle(closeButton).color : null,
      };
    })()`,
    returnByValue: true,
  });
  const result = check.result.value;
  if (!result.modalOpen) throw new Error("Contact modal did not open");
  if (result.headingColor !== "rgb(27, 46, 32)") throw new Error(`Question heading color is ${result.headingColor}`);
  if (result.asideColor !== "rgb(255, 255, 255)") throw new Error(`Sidebar contrast color is ${result.asideColor}`);
  const lightControlColors = ["rgb(255, 255, 255)", "rgb(247, 243, 234)"];
  if (!lightControlColors.includes(result.closeButtonColor)) throw new Error(`Close-button contrast color is ${result.closeButtonColor}`);
  console.log("Contact modal verified: #1b2e20 question heading and light-on-green modal controls render correctly.");
  socket.close();
} finally {
  await new Promise(resolve => {
    if (browser.exitCode !== null) return resolve();
    browser.once("exit", resolve);
    browser.kill("SIGTERM");
    setTimeout(resolve, 2_000);
  });
  await rm(profilePath, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
}
