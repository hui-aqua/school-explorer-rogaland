import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.SCHOOL_EXPLORER_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
page.on("pageerror", (error) => errors.push(error.message));

await page.goto(baseUrl, { waitUntil: "networkidle" });
await page.waitForSelector("#school-rows tr");
assert.equal(await page.locator("#result-count").textContent(), "22");
assert.equal(await page.locator("#school-rows tr").count(), 22);
assert.equal(await page.locator(".school-marker").count(), 22);

await page.selectOption("#map-mode", "all");
await page.waitForFunction(() => document.querySelectorAll("#school-rows tr").length === 103);
assert.equal(await page.locator(".school-marker").count(), 103);

await page.selectOption("#bullying-year", "2025-26");
await page.fill("#max-bullying", "10");
await page.locator("#max-bullying").dispatchEvent("input");
assert.ok(await page.locator("#school-rows tr").count() > 0);

await page.selectOption("#language", "en");
assert.equal(await page.locator("h1").textContent(), "School data explorer");

await page.click("#reset");
await page.setInputFiles("#xlsx-file", "data/Sola_Stavanger_Sandnes_schools_map_ready.xlsx");
await page.waitForFunction(() => document.querySelectorAll("#school-rows tr").length === 22);
assert.equal(await page.locator("#map-mode").inputValue(), "explicit");

await page.setInputFiles("#xlsx-file", "data/original/Sola_Stavanger_Sandnes_schools.xlsx");
await page.waitForFunction(() => document.querySelectorAll("#school-rows tr").length === 22);
await page.selectOption("#map-mode", "visible");
assert.equal(await page.locator("#school-rows tr").count(), 22);

await fs.mkdir("outputs/qa", { recursive: true });
await page.screenshot({ path: "outputs/qa/desktop.png", fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "outputs/qa/mobile.png", fullPage: true });

assert.deepEqual(errors, []);
await browser.close();
console.log("browser smoke test passed");
