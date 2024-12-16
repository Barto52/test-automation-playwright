import {expect, test} from '@playwright/test';

import {CommonFlow} from '@_flow/common.flow';
import {RegisterPageFlow} from '@_flow/registerPage.flow';
import {RegisterPage} from '@_pages/register.page';
import envConfig from '@_src/config/envConfig';
import {generateUserData} from '@_src/helpers/generateUserData.helper';

test.describe('Register a new user', () => {
    const userData = generateUserData();

    test('Registers a new user successfully via UI', async ({page}) => {
        const registerPage = new RegisterPage(page);
        const commonFlow = new CommonFlow(page);
        const registerPageFlow = new RegisterPageFlow(page);

        await commonFlow.gotoHomepage();
        await commonFlow.gotoRegisterPage();
        await registerPageFlow.verifyPageLabelsAndElements();
        await registerPageFlow.fillRegistrationForm(userData);
        await registerPageFlow.setRandomAvatarId();
        await registerPageFlow.verifyRegisterButtonVisibilityAndText();
        await registerPage.formRegisterButton.click();
        await registerPageFlow.verifyRegisterPopupVisibilityAndText();
        await page.waitForURL(envConfig.URL.loginURL);
        await expect(page).toHaveURL(envConfig.URL.loginURL);
    });
});
