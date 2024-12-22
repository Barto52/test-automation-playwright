import {expect, test} from '@playwright/test';

import {AccountPageFlow} from '@_flow/accountPage.flow';
import {CommonFlow} from '@_flow/common.flow';
import {LoginPageFlow} from '@_flow/loginPage.flow';
import {RegisterPageFlow} from '@_flow/registerPage.flow';
import {LoginPage} from '@_pages/login.page';
import {RegisterPage} from '@_pages/register.page';
import envConfig from '@_src/config/envConfig';
import {generateUserData} from '@_src/helpers/generateUserData.helper';

test.describe('User Management', () => {
    const userData = generateUserData();

    test('Registers a new user via UI', {tag: ['@e2e', '@userManagement']}, async ({page}) => {
        const registerPage = new RegisterPage(page);
        const commonFlow = new CommonFlow(page);
        const registerPageFlow = new RegisterPageFlow(page);

        await commonFlow.gotoHomepage();
        await commonFlow.gotoRegisterPageFromHeaderDropdown();
        await registerPageFlow.verifyPageLabelsAndElements();
        await registerPageFlow.fillRegistrationForm(userData);
        await registerPageFlow.setRandomAvatarId();
        await registerPage.registerButton.click();
        await registerPageFlow.verifyRegisterPopupVisibilityAndText();
        await page.waitForURL(envConfig.URL.loginURL);
        await expect(page).toHaveURL(envConfig.URL.loginURL);
    });

    test('Log in with a new user account', {tag: ['@e2e', '@userManagement']}, async ({page}) => {
        const loginPageFlow = new LoginPageFlow(page);
        const commonFlow = new CommonFlow(page);
        const loginPage = new LoginPage(page);
        const accountPageFlow = new AccountPageFlow(page);

        await commonFlow.gotoHomepage();
        await commonFlow.gotoLoginPageFromHeaderDropdown();
        await loginPageFlow.verifyPageLabelsAndElements();
        await loginPageFlow.fillLoginForm(userData);
        await loginPage.loginButton.click();
        await expect(page).toHaveURL(envConfig.URL.accountURL);
        await accountPageFlow.verifyPageLabelVisibilityAndContent(userData);
    });
});
