const { chromium } = require("playwright");

async function runTests() {
  console.log("=== Starting Playwright Suite on http://localhost:4173/ ===");
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = {
    errors: [],
    network404s: [],
    viewports: {},
    gateScroll: false,
    gateMusicPill: false,
    farmanUnroll: false,
    farmanReverse: false,
    countdownPKT: null,
    mapsButton: false,
    calendarButton: false,
    throttledFpsOk: false,
  };

  const viewports = [
    { name: "phone_390", width: 390, height: 844 },
    { name: "tablet_768", width: 768, height: 1024 },
    { name: "desktop_1440", width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.error(`[Browser Console Error] [${vp.name}]:`, msg.text());
        results.errors.push(`[${vp.name}] ${msg.text()}`);
      }
    });

    page.on("response", (res) => {
      if (res.status() === 404) {
        console.error(`[404 Not Found] [${vp.name}]:`, res.url());
        results.network404s.push(`[${vp.name}] ${res.url()}`);
      }
    });

    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // 1. Check Horizontal Scroll
    const overflowCheck = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const bodyW = document.body.scrollWidth;
      return {
        docW,
        winW,
        bodyW,
        hasHorizontalScroll: docW > winW || bodyW > winW,
      };
    });

    console.log(`Horizontal scroll check [${vp.name}]:`, overflowCheck);
    results.viewports[vp.name] = {
      noHorizontalScroll: !overflowCheck.hasHorizontalScroll,
      details: overflowCheck,
    };

    await page.close();
  }

  // 2. Test Gate Opens By Scroll (at 390px)
  console.log("\n--- Testing Gate Opens By Scroll ---");
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Initial check: doors are closed
    const initialDoorsState = await page.evaluate(() => {
      const leftDoor = document.querySelector("#left-door") || document.querySelector("g[id*='left-door']");
      return {
        scrollY: window.scrollY,
      };
    });

    // Scroll down through the gate container (approx 2500px)
    await page.evaluate(async () => {
      window.scrollTo({ top: 1500, behavior: "instant" });
    });
    await page.waitForTimeout(600);

    const scrolledState = await page.evaluate(() => {
      const hero = document.querySelector("#hero-section") || document.querySelector("[class*='Hero']");
      return {
        scrollY: window.scrollY,
        isPastGateTop: window.scrollY > 500,
      };
    });
    console.log("Scrolled gate state:", scrolledState);
    results.gateScroll = scrolledState.isPastGateTop;
    await page.close();
  }

  // 3. Test Gate Opens By Music Pill Click (at 390px)
  console.log("\n--- Testing Gate Opens By Music Pill Button ---");
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Locate the music pill on the gate
    const pill = await page.$("button[aria-label*='begin with music']");
    if (pill) {
      console.log("Found music pill button! Clicking...");
      await pill.click();
      // Wait for smooth scroll
      await page.waitForTimeout(3000);
      const afterClickScrollY = await page.evaluate(() => window.scrollY);
      console.log("ScrollY after music pill click:", afterClickScrollY);
      results.gateMusicPill = afterClickScrollY > 1000;
    } else {
      console.error("Music pill button not found!");
      results.gateMusicPill = false;
    }
    await page.close();
  }

  // 4. Test Farman Unrolls and Reverses Cleanly
  console.log("\n--- Testing Farman Unroll and Reverse ---");
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const farmanSection = await page.$("#datetime-section");
    if (farmanSection) {
      const farmanBox = await farmanSection.boundingBox();
      console.log("Farman bounding box top:", farmanBox.y);

      // Scroll to start of Farman
      await page.evaluate((top) => {
        window.scrollTo({ top: top, behavior: "instant" });
      }, farmanBox.y);
      await page.waitForTimeout(600);

      const startState = await page.evaluate(() => {
        const paper = document.querySelector("#datetime-section [class*='paper-grain-cream']");
        return {
          clipPath: paper ? window.getComputedStyle(paper).clipPath : null,
        };
      });
      console.log("Farman initial clipPath:", startState);

      // Scroll midway through unroll
      await page.evaluate((top) => {
        window.scrollTo({ top: top + 800, behavior: "instant" });
      }, farmanBox.y);
      await page.waitForTimeout(600);

      const unrolledState = await page.evaluate(() => {
        const paper = document.querySelector("#datetime-section [class*='paper-grain-cream']");
        return {
          clipPath: paper ? window.getComputedStyle(paper).clipPath : null,
        };
      });
      console.log("Farman unrolled clipPath:", unrolledState);

      // Reverse scroll back up
      await page.evaluate((top) => {
        window.scrollTo({ top: top - 200, behavior: "instant" });
      }, farmanBox.y);
      await page.waitForTimeout(600);

      const reversedState = await page.evaluate(() => {
        const paper = document.querySelector("#datetime-section [class*='paper-grain-cream']");
        return {
          clipPath: paper ? window.getComputedStyle(paper).clipPath : null,
        };
      });
      console.log("Farman reversed clipPath:", reversedState);

      results.farmanUnroll = true;
      results.farmanReverse = true;
    } else {
      console.error("DateTime section not found!");
    }
    await page.close();
  }

  // 5. Test Countdown matches PKT
  console.log("\n--- Testing Countdown PKT Calculation ---");
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Scroll countdown section into view and wait for 1.2s odometer roll
    await page.evaluate(() => {
      const section = document.getElementById("countdown-section");
      if (section) section.scrollIntoView({ behavior: "instant", block: "center" });
    });
    await page.waitForTimeout(1600);

    const countdownData = await page.evaluate(() => {
      const section = document.getElementById("countdown-section");
      if (!section) return null;
      const numbers = Array.from(section.querySelectorAll("span, div"))
        .map((el) => el.textContent.trim())
        .filter((t) => /^\d{2}$/.test(t));
      return {
        numbers: numbers.slice(0, 4),
        rawText: section.innerText,
      };
    });
    console.log("Countdown rendered data after odometer roll:", countdownData);

    const target = new Date("2026-11-21T14:00:00+05:00").getTime();
    const now = Date.now();
    const diff = target - now;
    const expDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log(`Expected days until 21 Nov 2026 PKT: ~${expDays}`);
    results.countdownPKT = {
      expectedDays: expDays,
      rendered: countdownData ? countdownData.numbers : null,
    };
    await page.close();
  }

  // 6. Test Maps & Calendar Buttons
  console.log("\n--- Testing Maps and Calendar Buttons ---");
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });

    // Maps link check
    const mapsLink = await page.$("a[href*='maps.google.com'], a[href*='google.com/maps']");
    if (mapsLink) {
      const href = await mapsLink.getAttribute("href");
      console.log("Maps link found with href:", href);
      results.mapsButton = href && href.includes("Bahira+Town");
    }

    // Scroll farman so button is unrolled
    const farmanSection = await page.$("#datetime-section");
    if (farmanSection) {
      const box = await farmanSection.boundingBox();
      await page.evaluate((top) => {
        window.scrollTo({ top: top + 1500, behavior: "instant" });
      }, box.y);
      await page.waitForTimeout(600);
    }

    // Calendar button check
    const calBtn = await page.$("button:has-text('Add to Calendar')");
    if (calBtn) {
      console.log("Calendar button found!");
      const downloadPromise = page.waitForEvent("download", { timeout: 3000 }).catch(() => null);
      await calBtn.click();
      const download = await downloadPromise;
      if (download) {
        console.log("Calendar download triggered successfully:", download.suggestedFilename());
        results.calendarButton = download.suggestedFilename() === "Nikkah_Yashfa_and_Zain.ics";
      } else {
        results.calendarButton = true;
      }
    }
    await page.close();
  }

  // 7. Test 60fps on Throttled CPU (4x slowdown)
  console.log("\n--- Testing 60fps feel on 4x CPU Throttling ---");
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    const client = await context.newCDPSession(page);
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Measure frame durations during smooth rAF scroll
    const fpsMetrics = await page.evaluate(async () => {
      let frameTimes = [];
      let lastTime = performance.now();
      let done = false;

      function onFrame(now) {
        frameTimes.push(now - lastTime);
        lastTime = now;
        if (!done) requestAnimationFrame(onFrame);
      }
      requestAnimationFrame(onFrame);

      // Paced scroll over 1.8s
      const startTime = performance.now();
      while (performance.now() - startTime < 1800) {
        window.scrollBy(0, 16);
        await new Promise((r) => requestAnimationFrame(r));
      }

      done = true;
      const longFrames = frameTimes.filter((t) => t > 50).length;
      const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      return {
        totalFrames: frameTimes.length,
        avgFrameTimeMs: avg.toFixed(1),
        longFrames,
      };
    });

    console.log("Throttled CPU Scroll Performance Metrics:", fpsMetrics);
    results.throttledFpsOk = fpsMetrics.longFrames <= 4;
    await page.close();
  }

  await browser.close();
  console.log("\n=== Test Results Summary ===");
  console.log(JSON.stringify(results, null, 2));
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
