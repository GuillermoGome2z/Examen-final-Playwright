import { Page, Locator } from '@playwright/test';

export class ModelPage {
  readonly page: Page;
  readonly title: Locator;
  readonly voteMessage: Locator;
  readonly voteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('my-model h3');
    this.voteMessage = page.locator('my-model .card-block p.card-text');
    this.voteButton = page.getByRole('button', { name: 'Vote!' });
  }
}
