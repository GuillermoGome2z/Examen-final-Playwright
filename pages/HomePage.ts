import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly overallRatingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.overallRatingLink = page.locator('a[href="/overall"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async openOverallRating() {
    await this.overallRatingLink.click();
  }
}
