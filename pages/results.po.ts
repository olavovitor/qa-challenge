import { expect, Page } from "@playwright/test";
import calendarLoc from "../aux_files/calendarLocators.json";
import resultsLoc from "../aux_files/resultsLocators.json";
import constants from "../aux_files/constants.json";

export class ResultsPage {
  constructor(private page: Page) {
    this.page = page;
  }

  // This block of code checks if all the results dates are within the range of dates set in the constants.json file
  async generatedDatesAssertion() {
    const datesList = await this.page.locator("p").nth(1).textContent();
    const datesArray = datesList
      ?.split("\n")
      .map((date) => date.trim())
      .filter((date) => date.length > 0);

    const startDate = (await this.setRangeOfDates()).startDate;
    const endDate = (await this.setRangeOfDates()).endDate;

    if (
      datesArray &&
      datesArray.length === Number(constants.TOTAL_RANDOM_DATES) // First ASSERT bullet from the prompts challenge (pdf file)
    ) {
      for (const date of datesArray) {
        const isInRange = await this.isDateInRange(date, startDate, endDate);
        expect(isInRange).toBeTruthy();
        console.log("The date", date, " is in the provided range? ", isInRange);
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }

    // This block of code checks if the informed date range in the page is equal to the boundaries set in the constants.json file
    const datesText = await this.page.locator("p").nth(2).textContent();
    const boundaryDates = datesText
      ? datesText.match(/\d{4}-\d{2}-\d{2}/g)
      : (console.log("No dates found in datesText"), []);

    console.log("\nThe range of dates is from ", startDate, " to ", endDate);

    // Second ASSERT bullet from the prompts challenge (pdf file)
    if (boundaryDates && boundaryDates.length === 2) {
      expect(boundaryDates[0]).toBe(startDate);
      expect(boundaryDates[1]).toBe(endDate);
    }
  }

  async setRangeOfDates() {
    const startDate = `${constants.START_YEAR}-${this.monthNameToNumber(
      constants.START_MONTH
    )}-${String(constants.START_DAY).padStart(2, "0")}`;

    const endDate = `${constants.END_YEAR}-${this.monthNameToNumber(
      constants.END_MONTH
    )}-${String(constants.END_DAY).padStart(2, "0")}`;

    return { startDate, endDate };
  }

  async isDateInRange(
    dateStr: string,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    const date = new Date(dateStr);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return date >= start && date <= end;
  }

  monthNameToNumber(month: string): Promise<string> {
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    return months[month] || month;
  }

  async generateDatesAgain() {
    await this.page.locator(resultsLoc.goBackBtn).click();

    await expect(
      this.page.locator(
        resultsLoc.listOf$GeneratedDatesTxt.replace(
          "$",
          constants.TOTAL_RANDOM_DATES
        )
      )
    ).toBeVisible();
  }

  async goBackToGeneratorPage() {
    await this.page.locator(resultsLoc.goBackBtn).click();

    await expect(this.page.locator(calendarLoc.section1Heading)).toBeVisible();
    await expect(this.page.locator(calendarLoc.getDatesBtn)).toBeVisible();
  }
}
