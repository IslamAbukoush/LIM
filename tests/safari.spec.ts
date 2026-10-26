import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test("Mobile header stays anchored through scrolling and viewport resizing", async ({ page }) => {
  await page.goto("/mosque-project/");
  const header = page.locator(".site-header");
  const initial = await header.boundingBox();
  for (const height of [844, 660, 780, 844]) {
    await page.setViewportSize({ width: 390, height });
    for (const top of [700, 1800, 50, 0]) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), top);
      await expect.poll(async () => (await header.boundingBox())?.y).toBe(0);
      await expect.poll(async () => (await header.boundingBox())?.height).toBe(initial?.height);
    }
  }
  expect(await header.evaluate(el => getComputedStyle(el).backdropFilter)).toBe("none");
});

test("Touch images remain stable and date controls fit their container", async ({ page }) => {
  await page.goto("/mosque-project/");
  await expect(page.locator(".photo").first()).toHaveAttribute("data-parallax", "false");
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
  expect(await page.locator(".photo-plane").first().evaluate(el => getComputedStyle(el).transform)).toBe("none");
  await page.goto("/report-discrimination/");
  const date = page.locator('input[type="date"]');
  await date.scrollIntoViewIfNeeded();
  const input = await date.boundingBox();
  const field = await date.locator("..").boundingBox();
  expect(input!.x + input!.width).toBeLessThanOrEqual(field!.x + field!.width + 1);
  await date.fill("2026-01-15");
  await expect(date).toHaveValue("2026-01-15");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Mobile menu and navigation restore usable content without residual transforms", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About", exact: true }).click();
  await expect(page.locator("h1")).toContainText("Faith and community");
  await expect.poll(() => page.locator("h1").evaluate(el => getComputedStyle(el).transform)).toBe("none");
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  await page.goBack();
  await expect(page.locator("h1")).toContainText("A community.");
  await expect.poll(() => page.locator(".site-header").evaluate(el => el.getBoundingClientRect().top)).toBe(0);
  expect(errors).toEqual([]);
});
