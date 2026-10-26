import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  workers: 2,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3000",
    browserName: process.env.TEST_BROWSER === "webkit" ? "webkit" : "chromium",
    channel: process.env.TEST_BROWSER === "webkit" ? undefined : "msedge",
    screenshot: "only-on-failure",
  },
  reporter: "list",
});
