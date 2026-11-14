import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

// HU-1: Registro de usuario
// Como usuario del sitio Buggy Cars Rating, quiero registrar mi usuario y mi
// clave, para poder crear mis credenciales de acceso.

const CARNE = '16429';

// Login único: carné + fecha y hora de la ejecución
function uniqueLogin(): string {
  return `${CARNE}_${Date.now()}`;
}

test.describe('HU-1 Registro de usuario', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  test('Caso 1 (HU-1, C4) Claves distintas: el sitio impide el registro e informa que no coinciden', async () => {
    await registerPage.fillForm(uniqueLogin(), 'Guillermo', 'Gomez', 'Qa!16429x', 'Qa!16429y');
    await registerPage.confirmPasswordInput.blur();

    await expect(registerPage.errorFor(registerPage.confirmPasswordInput)).toHaveText('Passwords do not match');
    await expect(registerPage.registerButton).toBeDisabled();
  });

  test('Caso 2 (HU-1, C2) Clave de 6 caracteres con mayúscula y carácter especial: el registro es exitoso', async () => {
    // "Abc!12": 6 caracteres, una mayúscula (A) y un carácter especial (!)
    await registerPage.register(uniqueLogin(), 'Guillermo', 'Gomez', 'Abc!12');

    await expect(registerPage.resultMessage).toHaveText('Registration is successful');
    await expect(registerPage.resultMessage).toHaveClass(/alert-success/);
  });
});
