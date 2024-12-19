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
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveURL(envConfig.URL.homepageURL);
    }

    async gotoRegisterPageFromHeaderDropdown(): Promise<void> {
        await this.commonPage.userDropdown.click();
        await this.commonPage.userDropdown.waitFor({state: 'visible'});
        await expect(this.commonPage.userDropdownContent).toBeVisible();
        await this.commonPage.userDropdownRegisterButton.click();
        await expect(this.page).toHaveURL(envConfig.URL.registerURL);
    }

    async gotoLoginPageFromHeaderDropdown(): Promise<void> {
        await this.commonPage.userDropdown.click();
        await this.commonPage.userDropdown.waitFor({state: 'visible'});
        await expect(this.commonPage.userDropdownContent).toBeVisible();
        await this.commonPage.userDropdownLoginButton.click();
        await expect(this.page).toHaveURL(envConfig.URL.loginURL);
    }
}
