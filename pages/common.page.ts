import {Page} from '@playwright/test';

export class CommonPage {
    constructor(private page: Page) {}

    //Buttons//
    loginButton = this.page.locator('#loginBtn');
    registerButton = this.page.locator('#registerBtn');

    //Dropdowns//
    userDropdown = this.page.locator('[data-testid="user-dropdown"]');
    userDropdownContent = this.page.locator('#dropdown-content');
    //Inputs//

    //Labels//
}
