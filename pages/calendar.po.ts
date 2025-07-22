import { Page, expect } from "@playwright/test";
import calendarLoc from "../aux_files/calendarLocators.json";
import resultsLoc from "../aux_files/resultsLocators.json";
import constants from "../aux_files/constants.json";

export class CalendarPage {
  constructor(private page: Page) {}

  async datesGenerator() {
    await this.page
      .locator(calendarLoc.numOfDaysInp)
      .fill(constants.TOTAL_RANDOM_DATES);

    await this.page
      .locator(calendarLoc.startDayField)
      .selectOption(constants.START_DAY);
    await this.page
      .locator(calendarLoc.startMonthField)
      .selectOption(constants.START_MONTH);
    await this.page
      .locator(calendarLoc.startYearField)
      .selectOption(constants.START_YEAR);
    await this.page
      .locator(calendarLoc.endDayField)
      .selectOption(constants.END_DAY);
    await this.page
      .locator(calendarLoc.endMonthField)
      .selectOption(constants.END_MONTH);
    await this.page
      .locator(calendarLoc.endYearField)
      .selectOption(constants.END_YEAR);

    await this.page
      .getByRole("button")
      .filter({ hasText: calendarLoc.getDatesBtn })
      .click();

    await expect(
      this.page.getByRole("button").filter({ hasText: resultsLoc.goBackBtn })
    ).toBeVisible();
  }
}
