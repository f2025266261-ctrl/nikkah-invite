const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const outputDir = process.env.OUTPUT_DIR || "C:\\Users\\haziq\\.gemini\\antigravity-ide\\brain\\b11373e2-9248-40b2-b8d2-8a16e1b5de5e";
const targetUrl = process.env.TARGET_URL || "http://localhost:5175/";

async function run() {
  console.log("Launching Chrome...");
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. PHONE CAPTURES (390px x 844px)
  console.log("Starting phone captures (390px x 844px)...");
  const phoneContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const phonePage = await phoneContext.newPage();
  await phonePage.goto(targetUrl, { waitUntil: "domcontentloaded" });
  await phonePage.waitForTimeout(1000);

  // Phone 1: Closed Gate
  await phonePage.screenshot({ path: path.join(outputDir, "phone_01_gate.png") });
  console.log("Captured phone_01_gate.png");

  // Phone 2: Hero Section (scroll past gate)
  await phonePage.evaluate(() => {
    window.scrollTo({ top: 2530, behavior: "instant" });
  });
  await phonePage.waitForTimeout(800);
  await phonePage.screenshot({ path: path.join(outputDir, "phone_02_hero.png") });
  console.log("Captured phone_02_hero.png");

  // Phone 3: Invitation Section
  await phonePage.evaluate(() => {
    const el = document.getElementById("invitation-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await phonePage.waitForTimeout(600);
  await phonePage.screenshot({ path: path.join(outputDir, "phone_03_invitation.png") });
  console.log("Captured phone_03_invitation.png");

  // Phone 4: Names Section (wait for handwriting reveal)
  await phonePage.evaluate(() => {
    const el = document.getElementById("names-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await phonePage.waitForTimeout(2200);
  await phonePage.screenshot({ path: path.join(outputDir, "phone_04_names.png") });
  console.log("Captured phone_04_names.png");

  // Phone 5: DateTime Section
  await phonePage.evaluate(() => {
    const el = document.getElementById("datetime-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await phonePage.waitForTimeout(600);
  await phonePage.screenshot({ path: path.join(outputDir, "phone_05_datetime.png") });
  console.log("Captured phone_05_datetime.png");

  // Phone 6: Countdown Section (Deep Crimson Panel)
  await phonePage.evaluate(() => {
    const el = document.getElementById("countdown-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await phonePage.waitForTimeout(600);
  await phonePage.screenshot({ path: path.join(outputDir, "phone_06_countdown.png") });
  console.log("Captured phone_06_countdown.png");

  // Phone 7: Venue Section (Deep Crimson Panel)
  await phonePage.evaluate(() => {
    const el = document.getElementById("venue-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await phonePage.waitForTimeout(1200);
  await phonePage.screenshot({ path: path.join(outputDir, "phone_07_venue.png") });
  console.log("Captured phone_07_venue.png");

  // Phone 8: Closing Section
  await phonePage.evaluate(() => {
    const el = document.getElementById("closing-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await phonePage.waitForTimeout(1400);
  await phonePage.screenshot({ path: path.join(outputDir, "phone_08_closing.png") });
  console.log("Captured phone_08_closing.png");

  await phoneContext.close();

  // 2. LAPTOP CAPTURES (1440px x 900px)
  console.log("Starting laptop captures (1440px x 900px)...");
  const laptopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    hasTouch: false,
  });
  const laptopPage = await laptopContext.newPage();
  await laptopPage.goto(targetUrl, { waitUntil: "domcontentloaded" });
  await laptopPage.waitForTimeout(1000);

  // Laptop 1: Closed Gate with Side Lanterns & Viewport Corner Roses
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_01_gate.png") });
  console.log("Captured laptop_01_gate.png");

  // Laptop 2: Hero Section (scroll past gate)
  await laptopPage.evaluate(() => {
    window.scrollTo({ top: 2250, behavior: "instant" });
  });
  await laptopPage.waitForTimeout(800);
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_02_hero.png") });
  console.log("Captured laptop_02_hero.png");

  // Laptop 3: Invitation Section
  await laptopPage.evaluate(() => {
    const el = document.getElementById("invitation-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await laptopPage.waitForTimeout(600);
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_03_invitation.png") });
  console.log("Captured laptop_03_invitation.png");

  // Laptop 4: Names Section (wait for handwriting reveal)
  await laptopPage.evaluate(() => {
    const el = document.getElementById("names-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await laptopPage.waitForTimeout(2200);
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_04_names.png") });
  console.log("Captured laptop_04_names.png");

  // Laptop 5: DateTime Section
  await laptopPage.evaluate(() => {
    const el = document.getElementById("datetime-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await laptopPage.waitForTimeout(600);
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_05_datetime.png") });
  console.log("Captured laptop_05_datetime.png");

  // Laptop 6: Countdown Section (Deep Crimson Panel)
  await laptopPage.evaluate(() => {
    const el = document.getElementById("countdown-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await laptopPage.waitForTimeout(600);
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_06_countdown.png") });
  console.log("Captured laptop_06_countdown.png");

  // Laptop 7: Venue Section (Deep Crimson Panel)
  await laptopPage.evaluate(() => {
    const el = document.getElementById("venue-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await laptopPage.waitForTimeout(1200);
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_07_venue.png") });
  console.log("Captured laptop_07_venue.png");

  // Laptop 8: Closing Section
  await laptopPage.evaluate(() => {
    const el = document.getElementById("closing-section");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await laptopPage.waitForTimeout(1400);
  await laptopPage.screenshot({ path: path.join(outputDir, "laptop_08_closing.png") });
  console.log("Captured laptop_08_closing.png");

  await laptopContext.close();
  await browser.close();
  console.log("All 16 screenshots successfully captured!");
}

run().catch((err) => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
