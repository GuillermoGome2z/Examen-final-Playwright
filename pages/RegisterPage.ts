import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Se usan los id del formulario: la barra de navegación también
    // tiene un input[name="password"] y chocaría con el del registro
    this.loginInput = page.locator('#username');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#confirmPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.resultMessage = page.locator('.result');
  }

  async navigate() {
    await this.page.goto('/register');
  }

  async fillForm(login: string, firstName: string, lastName: string, password: string, confirmPassword = password) {
    await this.loginInput.fill(login);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async register(login: string, firstName: string, lastName: string, password: string) {
    await this.fillForm(login, firstName, lastName, password);
    await this.registerButton.click();
  }

  // Mensaje de error que aparece debajo de un campo
  errorFor(field: Locator): Locator {
    return field.locator('xpath=following-sibling::div[contains(@class,"alert-danger")][not(@hidden)]');
  }

  // Escribe y borra el campo para que Angular lo marque como tocado
  async touchAndClear(field: Locator) {
    await field.fill('x');
    await field.fill('');
    await field.blur();
  }
}
