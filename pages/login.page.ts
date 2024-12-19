import {Page} from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    //Buttons//
    loginButton = this.page.locator('#loginButton');
    //Checkboxes//
    keepMeSignInCheckbox = this.page.locator('#keepSignIn');

    //Inputs//
    userEmailInput = this.page.locator('.input-field #username');
    userPasswordInput = this.page.locator('#password');

    //Labels//
    pageLabel = this.page.locator('[action="/process_login"] h2');
    checkboxLabel = this.page.locator('label[for="keepSignIn"]');
}
