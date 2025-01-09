import {Page} from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    loginAlert = this.page.locator('[data-testid="login-error"]');

    loginButton = this.page.locator('#loginButton');

    keepMeSignInCheckbox = this.page.locator('#keepSignIn');

    userEmailInput = this.page.locator('.input-field #username');
    userPasswordInput = this.page.locator('#password');

    pageLabel = this.page.locator('[action="/process_login"] h2');
    checkboxLabel = this.page.locator('label[for="keepSignIn"]');
}
