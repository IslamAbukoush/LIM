import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import messages from "../src/i18n/messages.json";

const routes = ["", "about", "programmes", "news", "advocacy", "mosque-project", "get-involved", "report-discrimination", "privacy", "programmes/community-care", "programmes/education-dialogue", "programmes/faith-belonging", "news/a-place-at-the-table", "news/give-your-time", "news/listening-with-care", "reports/community-perspectives", "reports/dignity-and-inclusion"];

for (const locale of ["ro", "ru"]) {
  test(`${locale}: every route renders translated content and language metadata`, async ({ page, request }) => {
    test.setTimeout(120000);
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      const url = `/${locale}/${route}${route ? "/" : ""}`;
      const raw = await request.get(url);
      expect(raw.status()).toBe(200);
      expect(await raw.text()).toContain(`<html lang="${locale}"`);
      await page.goto(url);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      const untranslated = await page.evaluate((dictionary) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const missing: string[] = [];
        while (walker.nextNode()) {
          const parent = walker.currentNode.parentElement;
          if (parent?.closest("script,style,option")) continue;
          const value = walker.currentNode.textContent?.replace(/\s+/g, " ").trim() ?? "";
          if (value.length > 12 && dictionary[value]) missing.push(value);
        }
        return missing;
      }, messages as Record<string, string[]>);
      expect(untranslated, url).toEqual([]);
      for (const width of [390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), { message: `${url} at ${width}` }).toBe(true);
      }
      if (["", "get-involved", "report-discrimination"].includes(route)) {
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
        expect(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("Language switch keeps page and anchor, updates both logos and survives reload", async ({ page }) => {
  await page.goto("/get-involved/#donate");
  await page.getByRole("link", { name: "Română", exact: true }).click();
  await expect(page).toHaveURL(/\/ro\/get-involved\/#donate/);
  await expect(page.locator(".site-header .brand-wordmark")).toContainText("Liga Islamică");
  await expect(page.locator("#donate")).toBeInViewport();
  await page.getByRole("link", { name: "Русский", exact: true }).click();
  await expect(page).toHaveURL(/\/ru\/get-involved\/#donate/);
  await expect(page.locator(".site-footer .brand-wordmark")).toContainText("Исламская лига");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator(".site-header .brand")).toHaveAttribute("href", "/ru/");
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page).toHaveURL(/(?<!ru|ro)\/get-involved\/#donate/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Romanian form labels, validation, options and success are translated", async ({ page }) => {
  await page.goto("/ro/get-involved/#volunteer");
  const form = page.locator("#volunteer form");
  await form.getByRole("button", { name: "Testează cererea" }).click();
  await expect(form.getByText("Introdu numele tău.")).toBeVisible();
  await form.getByLabel("Numele tău").fill("Demo Person");
  await form.getByLabel("Adresa de e-mail").fill("demo@example.com");
  await form.getByLabel("Domeniul de interes").selectOption({ label: "Sprijin comunitar" });
  await form.getByLabel("Disponibilitate").selectOption({ label: "Câteva ore pe lună" });
  await form.getByLabel("Ce te motivează să fii voluntar?").fill("Exemplu fictiv pentru testare.");
  await form.getByRole("checkbox", { name: /Înțeleg/ }).check();
  await form.getByRole("button", { name: "Testează cererea" }).click();
  await expect(page.locator("#volunteer .success-state h2")).toContainText("Îți mulțumim pentru timpul oferit.");
});

test("Russian report keeps user input and translates review choices", async ({ page }) => {
  await page.goto("/ru/report-discrimination/");
  await page.getByLabel("Тип ситуации").selectOption({ label: "На работе" });
  await page.getByLabel("Что произошло?").fill("My own words stay unchanged.");
  await page.getByRole("button", { name: "Продолжить" }).click();
  await page.getByRole("button", { name: "Продолжить" }).click();
  await expect(page.locator(".review-list")).toContainText("My own words stay unchanged.");
  await expect(page.locator(".review-list")).toContainText("На работе");
  await page.getByRole("checkbox", { name: /Я понимаю/ }).check();
  await page.getByRole("button", { name: "Завершить демонстрацию" }).click();
  await expect(page.locator(".success-state h2")).toContainText("Вы завершили демонстрацию.");
});
