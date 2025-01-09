import {Page} from '@playwright/test';

export class RegisterPage {
    constructor(private page: Page) {}

    registerButton = this.page.locator('[data-testid="register-button"]');
    calendarDoneButton = this.page.locator('.ui-datepicker-close');

    avatarSelectionDropdown = this.page.locator('select#avatar ');

    userBirthdateInput = this.page.locator('[data-testid="birthdate-input"]');
    userEmailInput = this.page.locator('[data-testid="email-input"]');
    userFirstNameInput = this.page.locator('[data-testid="firstname-input"]');
    userLastNameInput = this.page.locator('[data-testid="lastname-input"]');
    userPasswordInput = this.page.locator('[data-testid="password-input"]');

    userAvatar = this.page.locator('#userPicture');

    pageLabel = this.page.locator("form[id='registerForm'] div h2");

    alertPopup = this.page.locator('[data-testid="alert-popup"]');
}
