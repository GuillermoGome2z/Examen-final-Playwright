import { Page, Locator } from '@playwright/test';

export class OverallRatingPage {
  readonly page: Page;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('table tbody tr');
  }

  // Abre el modelo de la primera fila haciendo clic en su nombre
  async openFirstCar(): Promise<string> {
    const firstRow = this.rows.first();
    const modelLink = firstRow.locator('td').nth(2).locator('a');
    const modelName = (await modelLink.innerText()).trim();
    await modelLink.click();
    return modelName;
  }
}
