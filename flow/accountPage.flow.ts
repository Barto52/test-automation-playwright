import {Page, expect} from '@playwright/test';

import {AccountPage} from '@_pages/account.page';
import {getTextValueFromElement} from '@_src/helpers/getTextValueFromElement helper';
import {UserDataInterface} from '@_src/interfaces/userData.interface';

export class AccountPageFlow {
    private accountPage: AccountPage;

    constructor(private page: Page) {
        this.accountPage = new AccountPage(page);
    }

    async verifyPageLabelVisibilityAndContent(userData: UserDataInterface): Promise<void> {
        await expect(this.accountPage.welcomeMessageLabel).toBeVisible();
        await expect(this.accountPage.welcomeMessageLabel).toHaveText(`Hi ${userData.email}!`);
    }

    async gotoMyProfileAndGetUserID(): Promise<string> {
        await this.accountPage.myProfileButton.click();
        await expect(this.page).toHaveURL(/user\.html\?id=\d+/);
        const userID = await getTextValueFromElement(this.accountPage.userIDLabel);
        return userID;
    }

    async verifyUserIDInURL(userID: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`user\\.html\\?id=${userID}`));
    }
}
