import { expect, Page } from "@playwright/test";
import preSteps from "../aux_files/preStepsLocators.json";
import constants from "../aux_files/constants.json";

export class PreSteps {
  constructor(private page: Page) {
    this.page = page;
  }

  async navigateToBaseURL() {
    await this.page.goto(constants.DATES_PATH);
    expect(this.page.url()).toContain(constants.DATES_PATH);
  }

  async allowAllCookies() {
    await this.page
      .getByRole("button")
      .filter({ hasText: preSteps.allowAllCookies })
      .click();
  }
}
