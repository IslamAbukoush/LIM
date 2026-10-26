import { test, expect } from "@playwright/test";

test("Motion runs on entry and responds to scroll, with no hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("h1")).toHaveAttribute(
    "data-motion-revealed",
    "true",
  );
  await expect(page.locator(".hero-visual .photo")).toHaveAttribute(
    "data-parallax",
    "true",
  );
  const before = await page
    .locator(".hero-visual .photo-plane")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.locator("#mission").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".hero-visual .photo-plane")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe(before);
  await expect(page.locator(".site-header")).toHaveClass(/is-compact/);
  await page.locator(".programme-row").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".programme-row").first()).toHaveAttribute(
    "data-motion-revealed",
    "true",
  );
  expect(errors).toEqual([]);
});

test("Reduced motion hydrates cleanly and removes image movement", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .locator(".hero-visual img")
    .evaluate((image) => (image as HTMLImageElement).decode());
  await expect(page.locator(".hero-visual .photo")).toHaveAttribute(
    "data-parallax",
    "false",
  );
  expect(
    await page
      .locator(".photo-plane")
      .first()
      .evaluate((el) => getComputedStyle(el).transform),
  ).toBe("none");
  await page
    .getByRole("link", { name: "About the League", exact: true })
    .click();
  await expect(page.locator("h1")).toContainText("Faith and community");
  expect(errors).toEqual([]);
});

test("Logo is supplied identity and mobile menu preserves keyboard control", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".site-header .brand-seal")).toHaveAttribute(
    "src",
    "/brand/lim-seal.webp",
  );
  await expect(page.locator(".site-header .brand-wordmark")).toContainText(
    "Islamic League of",
  );
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Report discrimination" })
    .focus();
  await page.keyboard.press("Tab");
  await expect(page.locator(".site-header .brand")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});
