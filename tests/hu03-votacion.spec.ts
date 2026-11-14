import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { OverallRatingPage } from '../pages/OverallRatingPage';
import { ModelPage } from '../pages/ModelPage';

// HU-3: Votar por autos
// Como visitante o usuario del sitio, quiero votar por un auto, para conocer
// cuáles son los que más llaman la atención.

test.describe('HU-3 Votar por autos', () => {
  test('Caso 3 (HU-3, C4) Sin iniciar sesión: el primer auto de Overall Rating informa que debe iniciar sesión para votar', async ({ page }) => {
    const homePage = new HomePage(page);
    const overallPage = new OverallRatingPage(page);
    const modelPage = new ModelPage(page);

    await homePage.navigate();
    await homePage.openOverallRating();
    await expect(page).toHaveURL(/\/overall/);
    await expect(overallPage.rows.first()).toBeVisible();

    const modelName = await overallPage.openFirstCar();
    await expect(page).toHaveURL(/\/model\//);
    await expect(modelPage.title).toContainText(modelName);

    await expect(modelPage.voteMessage).toHaveText('You need to be logged in to vote.');
    await expect(modelPage.voteButton).toHaveCount(0);
  });
});
