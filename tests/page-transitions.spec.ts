import { test, expect } from "@playwright/test";

test("Navigation animates the page while keeping the header steady", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "About", exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.getAnimations().some(a => a instanceof CSSAnimation && a.animationName === "page-arrive"))).toBe(true);
  await expect(page.locator("h1")).toContainText("Faith and community");
  await expect.poll(() => page.evaluate(() => document.getAnimations().filter(a => a instanceof CSSAnimation && a.animationName.startsWith("page-")).length)).toBe(0);
  expect(await page.locator(".site-header").evaluate(el => getComputedStyle(el).viewTransitionName)).toBe("site-header");
  await page.goBack();
  await expect(page.locator("h1")).toContainText("A community.");
  await page.goForward();
  await expect(page.locator("h1")).toContainText("Faith and community");
  expect(errors).toEqual([]);
});

test("Cross-page anchors still arrive at the requested form", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".header-donate").click();
  await expect(page).toHaveURL(/get-involved\/#donate/);
  await expect(page.locator("#donate")).toBeInViewport();
  await expect(page.locator("#donate input").first()).toBeAttached();
});

test("Reduced motion removes route animation timing", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: "About the League", exact: true }).click();
  await expect(page.locator("h1")).toContainText("Faith and community");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement, "::view-transition-new(page-content)").animationDuration)).toBe("0s");
});
