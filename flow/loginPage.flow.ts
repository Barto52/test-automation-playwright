import {Page, expect} from '@playwright/test';

import {LoginPage} from '@_pages/login.page';
import {LoginPageEnum} from '@_src/enums/loginPage.enum';
import { UserDataInterface } from '@_src/interfaces/userData.interface';

export class LoginPageFlow {
    private loginPage: LoginPage;

    constructor(private page: Page) {
        this.loginPage = new LoginPage(page);
    }

    async verifyPageLabelsAndElements(): Promise<void> {
        await this.verifyPageLabelVisibilityAndContent();
        await this.verifyInputsAndPlaceholders();
        await this.verifyCheckboxVisibilityAndContent();
        await this.verifyLoginButtonVisibilityAndText();
    }

    async verifyPageLabelVisibilityAndContent(): Promise<void> {
        await expect(this.loginPage.pageLabel).toBeVisible();
        await expect(this.loginPage.pageLabel).toHaveText(LoginPageEnum.PageLabel);
    }

    async verifyInputsAndPlaceholders(): Promise<void> {
        const inputsLabels = [
            {input: this.loginPage.userEmailInput, label: LoginPageEnum.EmailInputLabel},
            {input: this.loginPage.userPasswordInput, label: LoginPageEnum.PasswordInputLabel},
        ];

        for (const {input, label} of inputsLabels) {
            await expect(input).toBeVisible();
            await expect(input).toHaveAttribute('placeholder', label);
        }
    }

    async verifyCheckboxVisibilityAndContent(): Promise<void> {
        await expect(this.loginPage.keepMeSignInCheckbox).toBeVisible();
        await this.loginPage.keepMeSignInCheckbox.check();
        await expect(this.loginPage.keepMeSignInCheckbox).toBeChecked();
        await this.loginPage.keepMeSignInCheckbox.uncheck();
        await expect(this.loginPage.keepMeSignInCheckbox).not.toBeChecked();
        await expect(this.loginPage.checkboxLabel).toHaveText(LoginPageEnum.CheckboxLabel);
    }

    async verifyLoginButtonVisibilityAndText(): Promise<void> {
        await expect(this.loginPage.loginButton).toBeVisible();
        await expect(this.loginPage.loginButton).toBeEnabled();
        await expect(this.loginPage.loginButton).toHaveText(LoginPageEnum.LoginButtonLabel);
    }

     async fillLoginForm(userData: UserDataInterface): Promise<void> {
           await this.loginPage.userEmailInput.fill(userData.email)
           await this.loginPage.userPasswordInput.fill(userData.password)
        }
     
}
