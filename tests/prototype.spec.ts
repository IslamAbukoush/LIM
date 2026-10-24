import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about/",
  "/programmes/",
  "/programmes/community-care/",
  "/programmes/education-dialogue/",
  "/programmes/faith-belonging/",
  "/news/",
  "/news/a-place-at-the-table/",
  "/news/give-your-time/",
  "/news/listening-with-care/",
  "/advocacy/",
  "/reports/community-perspectives/",
  "/reports/dignity-and-inclusion/",
  "/mosque-project/",
  "/get-involved/",
  "/report-discrimination/",
  "/privacy/",
];
test("All routes, imagery, links and desktop accessibility", async ({
  page,
}) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.locator("body").waitFor();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBeTruthy();
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((i) => (i as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});
test("Responsive layouts and navigation", async ({ page }) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/programmes/",
      "/news/",
      "/advocacy/",
      "/mosque-project/",
      "/get-involved/",
      "/report-discrimination/",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${width} ${route}`,
      ).toBeTruthy();
    }
    await page.goto("/");
    await page.screenshot({
      path: `artifacts/home-${width}.png`,
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Advocacy", exact: true })
    .click();
  await expect(page).toHaveURL(/advocacy/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});
test("Contact validation, mock failure and retry", async ({ page }) => {
  await page.goto("/get-involved/#contact");
  const form = page.locator("#contact form");
  await form.getByRole("button", { name: "Preview enquiry" }).click();
  await expect(form.getByText("Enter a valid email address.")).toBeVisible();
  await form.getByLabel("Your name").fill("Demo Person");
  await form.getByLabel("Email address").fill("demo@example.com");
  await form
    .getByLabel("Your message")
    .fill("A fictional enquiry for the website preview.");
  await form.getByRole("checkbox", { name: /I understand/ }).check();
  await form.getByText("Prototype testing options").click();
  await form
    .getByRole("checkbox", { name: "Simulate a submission error" })
    .check();
  await form.getByRole("button", { name: "Preview enquiry" }).click();
  await expect(
    form.getByText(/This is a simulated submission error/),
  ).toBeVisible();
  await form
    .getByRole("checkbox", { name: "Simulate a submission error" })
    .uncheck();
  await form.getByRole("button", { name: "Preview enquiry" }).click();
  await expect(
    page
      .locator("#contact")
      .getByRole("heading", { name: "Thank you for reaching out." }),
  ).toBeVisible();
});
test("Volunteer application", async ({ page }) => {
  await page.goto("/get-involved/#volunteer");
  const form = page.locator("#volunteer form");
  await form.getByLabel("Your name").fill("Demo Volunteer");
  await form.getByLabel("Email address").fill("volunteer@example.com");
  await form.getByLabel("Area of interest").selectOption("Community care");
  await form.getByLabel("Availability").selectOption("A few hours a month");
  await form
    .getByLabel("What motivates you to volunteer?")
    .fill("I want to explore the sample volunteer application.");
  await form.getByRole("checkbox", { name: /I understand/ }).check();
  await form.getByRole("button", { name: "Preview application" }).click();
  await expect(
    page.getByRole("heading", { name: "Thank you for offering your time." }),
  ).toBeVisible();
});
test("Donation custom validation, review, edit and success", async ({
  page,
}) => {
  await page.goto("/get-involved/#donate");
  const form = page.locator("#donate form");
  await form.getByRole("button", { name: "Custom", exact: true }).click();
  await form.getByLabel("Custom amount").fill("-2");
  await form.getByRole("button", { name: "Review contribution" }).click();
  await expect(form.getByRole("alert")).toContainText("Enter an amount");
  await form.getByLabel("Custom amount").fill("750");
  await form.getByRole("button", { name: "Review contribution" }).click();
  await expect(form.getByText("750 MDL")).toBeVisible();
  await form.getByRole("button", { name: "Edit amount" }).click();
  await expect(form.getByLabel("Custom amount")).toHaveValue("750");
  await form.getByRole("button", { name: "Review contribution" }).click();
  await form.getByRole("checkbox", { name: /I understand/ }).check();
  await form.getByRole("button", { name: "Complete demo" }).click();
  await expect(
    page.getByRole("heading", { name: "Your generosity has a place here." }),
  ).toBeVisible();
});
test("Report step validation, back navigation, review and completion", async ({
  page,
}) => {
  await page.goto("/report-discrimination/");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByText("Choose a type, or select Not sure."),
  ).toBeVisible();
  await page.getByLabel("Type of experience").selectOption("Education");
  await page
    .getByLabel("What happened?")
    .fill("Fictional example for testing the report journey.");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Contact preference").selectOption("Email");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText(/Enter a valid email address/)).toBeVisible();
  await page
    .getByLabel("Email address", { exact: false })
    .fill("case@example.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByText("Fictional example for testing the report journey."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByLabel("Email address")).toHaveValue(
    "case@example.com",
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("checkbox", { name: /I understand/ }).check();
  await page.getByRole("button", { name: "Finish demo" }).click();
  await expect(
    page.getByRole("heading", { name: "You’ve completed the preview." }),
  ).toBeVisible();
});
test("News filters, FAQ and real sample PDF", async ({ page, request }) => {
  await page.goto("/news/");
  await page.getByRole("button", { name: "Advocacy", exact: true }).click();
  await expect(page.locator(".news-grid .story-card")).toHaveCount(1);
  await expect(page.locator(".news-grid")).toContainText(
    "Every experience deserves to be heard",
  );
  await page.goto("/mosque-project/");
  await page
    .getByText("Is this the final mosque design?", { exact: true })
    .click();
  await expect(
    page.getByText(/No. The photography is architectural inspiration/),
  ).toBeVisible();
  const pdf = await request.get("/reports/community-perspectives.pdf");
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 8).toString()).toContain("%PDF-1.4");
});
test("Reduced motion and mobile accessibility", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/get-involved/", "/report-discrimination/"]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});
