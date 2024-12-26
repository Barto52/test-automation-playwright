import {Page} from '@playwright/test';

export class AccountPage {
    constructor(private page: Page) {}

    //Buttons//
    myProfileButton = this.page.locator('#btnMyAccountLink button');
    //Checkboxes//

    //Inputs//

    //Labels//
    welcomeMessageLabel = this.page.locator('[data-testid="hello"]');
    userIDLabel = this.page.locator('[data-testid="id"]');
}
