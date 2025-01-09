import {Page} from '@playwright/test';

export class AccountPage {
    constructor(private page: Page) {}

    myProfileButton = this.page.locator('#btnMyAccountLink button');
  
    welcomeMessageLabel = this.page.locator('[data-testid="hello"]');
    userIDLabel = this.page.locator('[data-testid="id"]');
}
