import {Page, expect} from '@playwright/test';

import {AccountPage} from '@_pages/account.page';
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
}
