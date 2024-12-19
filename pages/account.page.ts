import {Page} from '@playwright/test';

export class AccountPage {
    constructor(private page: Page) {}

    //Buttons//

    //Checkboxes//

    //Inputs//

    //Labels//
    welcomeMessageLabel = this.page.locator('[data-testid="hello"]');
}
