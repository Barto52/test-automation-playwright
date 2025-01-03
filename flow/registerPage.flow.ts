import {Page, expect} from '@playwright/test';

import {RegisterPage} from '@_pages/register.page';
import envConfig from '@_src/config/envConfig';
import {RegisterPageEnum} from '@_src/enums/registerPage.enum';
import {getRandomAvatarId} from '@_src/helpers/getRandomValue.helper';
import {UserDataInterface} from '@_src/interfaces/userData.interface';

export class RegisterPageFlow {
    private registerPage: RegisterPage;

    constructor(private page: Page) {
        this.registerPage = new RegisterPage(page);
    }

    async verifyPageLabelsAndElements(): Promise<void> {
        await this.verifyPageLabelVisibilityAndContent();
        await this.verifyInputsAndPlaceholders();
        await this.verifyAvatarVisibilityAndSize();
        await this.verifyDropdownVisibility();
        await this.verifyRegisterButtonVisibilityAndText();
    }

    async verifyPageLabelVisibilityAndContent(): Promise<void> {
        await expect(this.registerPage.pageLabel).toBeVisible();
        await expect(this.registerPage.pageLabel).toHaveText(RegisterPageEnum.PageLabel);
    }

    async verifyInputsAndPlaceholders(): Promise<void> {
        const inputsLabels = [
            {
                input: this.registerPage.userFirstNameInput,
                label: RegisterPageEnum.FirstNameInputLabel,
            },
            {
                input: this.registerPage.userLastNameInput,
                label: RegisterPageEnum.LastNameInputLabel,
            },
            {
                input: this.registerPage.userEmailInput,
                label: RegisterPageEnum.EmailInputLabel,
            },
            {
                input: this.registerPage.userBirthdateInput,
                label: RegisterPageEnum.BirthDateInputLabel,
            },
            {
                input: this.registerPage.userPasswordInput,
                label: RegisterPageEnum.PasswordInputLabel,
            },
        ];

        for (const {input, label} of inputsLabels) {
            await expect(input).toBeVisible();
            await expect(input).toHaveAttribute('placeholder', label);
        }
    }

    async verifyAvatarVisibilityAndSize(): Promise<void> {
        await expect(this.registerPage.userAvatar).toBeVisible();
        await expect(this.registerPage.userAvatar).toHaveCSS('width', '100px');
        await expect(this.registerPage.userAvatar).toHaveCSS('height', '100px');
    }

    async verifyDropdownVisibility(): Promise<void> {
        await expect(this.registerPage.avatarSelectionDropdown).toBeVisible();
        await expect(this.registerPage.avatarSelectionDropdown).toBeTruthy();
    }

    async setRandomAvatarId(): Promise<void> {
        const randomUserAvatarId = getRandomAvatarId();

        await this.registerPage.avatarSelectionDropdown.selectOption(randomUserAvatarId);
        await expect(this.registerPage.avatarSelectionDropdown).toHaveValue(randomUserAvatarId);
    }
    async fillRegistrationForm(userData: UserDataInterface): Promise<void> {
        await this.registerPage.userFirstNameInput.fill(userData.firstName);
        await expect(this.registerPage.userFirstNameInput).toHaveValue(userData.firstName);

        await this.registerPage.userLastNameInput.fill(userData.lastName);
        await expect(this.registerPage.userLastNameInput).toHaveValue(userData.lastName);

        await this.registerPage.userEmailInput.fill(userData.email);
        await expect(this.registerPage.userEmailInput).toHaveValue(userData.email);

        await this.registerPage.userBirthdateInput.fill(userData.birthDate);
        await expect(this.registerPage.userBirthdateInput).toHaveValue(userData.birthDate);

        await this.registerPage.calendarDoneButton.click();

        await this.registerPage.userPasswordInput.fill(userData.password);
        await expect(this.registerPage.userPasswordInput).toHaveValue(userData.password);
    }

    async verifyRegisterButtonVisibilityAndText(): Promise<void> {
        await expect(this.registerPage.registerButton).toBeVisible();
        await expect(this.registerPage.registerButton).toBeEnabled();
        await expect(this.registerPage.registerButton).toHaveText(RegisterPageEnum.RegisterButtonLabel);
    }

    async submitRegisterForm(): Promise<void> {
        await this.registerPage.registerButton.click();
        await expect(this.registerPage.alertPopup).toBeVisible();
        await expect(this.registerPage.alertPopup).toHaveText(RegisterPageEnum.AlertPopupLabel);
        await this.page.waitForURL(envConfig.URL.loginURL);
        await expect(this.page).toHaveURL(envConfig.URL.loginURL);
    }
}
