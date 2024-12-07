import {Page, expect} from '@playwright/test';

import {CommonPage} from '@_pages/common.page';
import envConfig from '@_src/config/envConfig';

export class CommonFlow {
    private commonPage: CommonPage;

    constructor(private page: Page) {
        this.commonPage = new CommonPage(page);
    }

    async gotoHomepage(): Promise<void> {
        await this.page.goto(envConfig.URL.homepageURL);
        await expect(this.page).toHaveURL(envConfig.URL.homepageURL);
    }

    async gotoRegisterPage(): Promise<void> {
        await this.commonPage.userDropdown.click();
        await expect(this.commonPage.userDropdownContent).toBeVisible();
        await this.commonPage.registerButton.click();
        await expect(this.page).toHaveURL(envConfig.URL.registerURL);
    }
}
