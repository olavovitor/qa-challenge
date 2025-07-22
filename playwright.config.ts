import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  expect: {
    timeout: 10 * 1000,
  },
  globalTimeout: 60 * 60 * 1000,
  fullyParallel: true,
  reporter: [["html"], ["list"], ["json", { outputFile: "test-results.json" }]],
  use: {
    baseURL: "https://www.random.org",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "GoogleChrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    } /*,
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "MicrosoftEdge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Safari",
      use: { ...devices["Desktop"] },
    },*/,
  ],
});
