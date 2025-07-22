import { test as base, BrowserContext, expect, Page } from "@playwright/test";
import { PreSteps } from "../pages/preSteps.ts";
import { CalendarPage } from "../pages/calendar.po.ts";
import { ResultsPage } from "../pages/results.po.ts";

// Using 3 different Fixtures as Page Objects
type MyTestFixtures = {
  preSteps: PreSteps;
  calendarPage: CalendarPage;
  resultsPage: ResultsPage;
};

const test = base.extend<MyTestFixtures>({
  preSteps: async ({ page }, use) => {
    const preSteps = new PreSteps(page);
    await use(preSteps);
  },
  calendarPage: async ({ page }, use) => {
    const calendarPage = new CalendarPage(page);
    await use(calendarPage);
  },
  resultsPage: async ({ page }, use) => {
    const resultsPage = new ResultsPage(page);
    await use(resultsPage);
  },
});

test.describe("E2E Tests - Date Generator Challenge", () => {
  test.describe("Main Flow", () => {
    test.beforeEach(async ({ preSteps }) => {
      await preSteps.navigateToBaseURL();
      await preSteps.allowAllCookies();
    });

    test(
      "Generate and validate 4 output dates between '2024-01-05' and '2025-11-25'",
      { tag: ["@mainFlow"] },
      async ({ calendarPage, resultsPage }) => {
        await calendarPage.datesGenerator();

        await resultsPage.generatedDatesAssertion();
      }
    );
  });
});
