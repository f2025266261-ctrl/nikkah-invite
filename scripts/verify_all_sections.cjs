const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const screenshotDir = process.env.SCREENSHOT_DIR || "C:\\Users\\haziq\\.gemini\\antigravity-ide\\brain\\3ca83675-93dc-4fb2-a22a-2326ec4c4112\\screenshots";
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const targetUrl = process.env.TARGET_URL || "http://localhost:4173/";

const sections = [
  { id: "hero-section", name: "01_hero" },
  { id: "invitation-section", name: "02_invitation" },
  { id: "names-section", name: "03_names" },
  { id: "datetime-section", name: "04_datetime" },
  { id: "countdown-section", name: "05_countdown" },
  { id: "venue-section", name: "06_venue" },
  { id: "dresscode-section", name: "07_dresscode" },
  { id: "closing-section", name: "08_closing" },
];

async function run() {
  console.log(`=== Running Section Verification on ${targetUrl} ===\n`);
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const viewports = [
    { name: "390px", width: 390, height: 844 },
    { name: "1440px", width: 1440, height: 900 },
  ];

  const overallFailures = [];
  const capturedScreenshots = [];

  for (const vp of viewports) {
    console.log(`\n==================================================`);
    console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`==================================================`);

    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    await page.goto(targetUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    for (const sec of sections) {
      console.log(`\n[${vp.name}] Testing Section: ${sec.id}...`);

      // Scroll to section
      const scrolled = await page.evaluate((id) => {
        let el = document.getElementById(id);
        if (!el && id === "hero-section") {
          // If hero is within gate, find hero container or scroll past gate top
          el = document.querySelector("[class*='Hero']") || document.querySelector("h1, h2");
        }
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "center" });
          return true;
        }
        return false;
      }, sec.id);

      if (!scrolled) {
        console.error(`ERROR: Element #${sec.id} not found in DOM!`);
        overallFailures.push(`[${vp.name}] #${sec.id} not found`);
        continue;
      }

      // If Farman datetime section, scroll down slightly into its pinned area to trigger unroll
      if (sec.id === "datetime-section") {
        await page.evaluate(() => {
          const el = document.getElementById("datetime-section");
          if (el) {
            const rect = el.getBoundingClientRect();
            window.scrollBy(0, 1000);
          }
        });
      }

      // Wait 2.5s as specified in prompt
      await page.waitForTimeout(2500);

      // If countdown section, allow any in-flight 350ms second flip tick to finish settling
      if (sec.id === "countdown-section") {
        await page.waitForFunction(
          () => {
            const sec = document.getElementById("countdown-section");
            if (!sec) return true;
            const spans = Array.from(sec.querySelectorAll(".font-heading"));
            return spans.every((s) => parseFloat(window.getComputedStyle(s).opacity || "1") >= 0.9);
          },
          { timeout: 1200 }
        ).catch(() => {});
      }

      // Verify all text elements inside section
      const inspection = await page.evaluate(
        ({ id, vpWidth }) => {
          let secEl = document.getElementById(id);
          if (!secEl && id === "hero-section") {
            secEl = document.querySelector("#hero-section") || document.querySelector("[class*='Hero']");
          }
          if (!secEl) return { found: false, textElements: [] };

          const textElements = [];
          const candidates = Array.from(secEl.querySelectorAll("h1, h2, h3, h4, p, span, a, button"));

          for (const el of candidates) {
            const text = (el.innerText || el.textContent || "").trim();
            // Skip empty text or decorative symbols
            if (!text || text === "◆" || text === "”" || text === "“" || text === "﷽") {
              continue;
            }

            // Also check if this element contains other candidate children (we want leaf-level or meaningful text blocks)
            const hasTextChild = Array.from(el.children).some(
              (c) => ["H1", "H2", "H3", "H4", "P", "SPAN"].includes(c.tagName) && c.textContent.trim().length > 0
            );
            if (hasTextChild && el.children.length > 0 && !["A", "BUTTON"].includes(el.tagName)) {
              continue;
            }

            // In AnimatePresence containers (like the odometer counter), older exiting spans animate out to 0
            // Only inspect the active mounted child
            if (el.parentElement && el.parentElement.children.length > 1) {
              const siblings = Array.from(el.parentElement.children);
              if (siblings.some((s) => s !== el && parseFloat(window.getComputedStyle(s).opacity || "0") >= 0.9)) {
                continue;
              }
            }

            const style = window.getComputedStyle(el);
            const parentStyle = el.parentElement ? window.getComputedStyle(el.parentElement) : style;

            const opacity = parseFloat(style.opacity || "1");
            const parentOpacity = parseFloat(parentStyle.opacity || "1");
            const effectiveOpacity = Math.min(opacity, parentOpacity);

            const clipPath = style.clipPath || "none";
            const parentClip = parentStyle.clipPath || "none";
            const isClipped =
              (clipPath !== "none" && clipPath.includes("100%")) ||
              (parentClip !== "none" && parentClip.includes("100%"));

            const rect = el.getBoundingClientRect();
            const sitsOutsideHorizontally = rect.width > 0 && (rect.left < -4 || rect.right > vpWidth + 4);

            textElements.push({
              tag: el.tagName,
              text: text.slice(0, 40),
              effectiveOpacity,
              isClipped,
              sitsOutsideHorizontally,
              rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
            });
          }

          return { found: true, textElements };
        },
        { id: sec.id, vpWidth: vp.width }
      );

      console.log(`Inspected ${inspection.textElements.length} text elements in #${sec.id}`);

      let sectionPassed = true;
      for (const t of inspection.textElements) {
        if (t.effectiveOpacity < 0.9) {
          console.error(`  FAIL [Opacity < 0.9]: <${t.tag}> "${t.text}" has opacity ${t.effectiveOpacity}`);
          overallFailures.push(`[${vp.name}] #${sec.id} "${t.text}" opacity ${t.effectiveOpacity} < 0.9`);
          sectionPassed = false;
        }
        if (t.isClipped) {
          console.error(`  FAIL [ClipPath]: <${t.tag}> "${t.text}" is clipped`);
          overallFailures.push(`[${vp.name}] #${sec.id} "${t.text}" is clipped`);
          sectionPassed = false;
        }
        if (t.sitsOutsideHorizontally) {
          console.error(`  FAIL [Horizontal Overflow]: <${t.tag}> "${t.text}" rect:`, t.rect);
          overallFailures.push(`[${vp.name}] #${sec.id} "${t.text}" sits outside horizontally`);
          sectionPassed = false;
        }
      }

      if (sec.id === "dresscode-section") {
        const figuresCheck = await page.evaluate(() => {
          const sec = document.getElementById("dresscode-section");
          if (!sec) return { found: false, bride: null, groom: null };
          const brideFig = sec.querySelector("[data-reveal='dresscode-bride'] img, [data-reveal='dresscode-bride'] svg") || sec.querySelector("img[alt*='Bride']");
          const groomFig = sec.querySelector("[data-reveal='dresscode-groom'] img, [data-reveal='dresscode-groom'] svg") || sec.querySelector("img[alt*='Groom']");

          const getMetrics = (el) => {
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            const pStyle = el.parentElement ? window.getComputedStyle(el.parentElement) : style;
            const effectiveOpacity = Math.min(parseFloat(style.opacity || "1"), parseFloat(pStyle.opacity || "1"));
            return {
              hasNonZeroBBox: rect.width > 0 && rect.height > 0,
              rect: { width: Math.round(rect.width), height: Math.round(rect.height) },
              effectiveOpacity,
            };
          };

          return {
            found: true,
            bride: getMetrics(brideFig),
            groom: getMetrics(groomFig),
          };
        });

        console.log(`[${vp.name}] Dress Code Figures Check:`, figuresCheck);
        if (!figuresCheck.bride || !figuresCheck.bride.hasNonZeroBBox || figuresCheck.bride.effectiveOpacity < 0.9) {
          console.error(`  FAIL: Bride figure is not visible or has zero bbox:`, figuresCheck.bride);
          overallFailures.push(`[${vp.name}] Bride figure not visible (opacity < 0.9 or 0 bbox)`);
          sectionPassed = false;
        } else {
          console.log(`  PASSED: Bride figure is visible with bbox ${figuresCheck.bride.rect.width}x${figuresCheck.bride.rect.height} and opacity ${figuresCheck.bride.effectiveOpacity}!`);
        }

        if (!figuresCheck.groom || !figuresCheck.groom.hasNonZeroBBox || figuresCheck.groom.effectiveOpacity < 0.9) {
          console.error(`  FAIL: Groom figure is not visible or has zero bbox:`, figuresCheck.groom);
          overallFailures.push(`[${vp.name}] Groom figure not visible (opacity < 0.9 or 0 bbox)`);
          sectionPassed = false;
        } else {
          console.log(`  PASSED: Groom figure is visible with bbox ${figuresCheck.groom.rect.width}x${figuresCheck.groom.rect.height} and opacity ${figuresCheck.groom.effectiveOpacity}!`);
        }
      }

      if (sectionPassed) {
        console.log(`  PASSED: All elements in #${sec.id} are visible with opacity >= 0.9 and fit within ${vp.width}px!`);
      }

      // Capture screenshot
      const shotName = `${vp.name}_${sec.name}.png`;
      const shotPath = path.join(screenshotDir, shotName);
      await page.screenshot({ path: shotPath });
      capturedScreenshots.push({ viewport: vp.name, section: sec.name, path: shotPath });
      console.log(`  Captured screenshot: ${shotName}`);
    }

    await page.close();
  }

  await browser.close();

  console.log("\n==================================================");
  console.log("TEST SUMMARY REPORT");
  console.log("==================================================");
  console.log(`Total Screenshots Captured: ${capturedScreenshots.length}`);
  console.log(`Total Failures Detected: ${overallFailures.length}`);

  if (overallFailures.length > 0) {
    console.error("FAILURES:");
    overallFailures.forEach((f) => console.error(" - " + f));
    process.exit(1);
  } else {
    console.log("ALL TEXT IN ALL SECTIONS AT 390px AND 1440px IS 100% VISIBLE WITH OPACITY >= 0.9!");
  }
}

run().catch((err) => {
  console.error("Test runner error:", err);
  process.exit(1);
});
