import {test} from '@playwright/test';

import {AccountPageFlow} from '@_flow/accountPage.flow';
import {CommonFlow} from '@_flow/common.flow';
import {LoginPageFlow} from '@_flow/loginPage.flow';
import {RegisterPageFlow} from '@_flow/registerPage.flow';
import {UserDataFactory} from '@_src/factory/generateUserData.factory';

test.describe('User Management', () => {
    const userDataFactory = new UserDataFactory();
    const userData = userDataFactory.generateUserData();
    let userID;

    test('Registers a new user via UI', {tag: ['@e2e', '@userManagement']}, async ({page}) => {
        const commonFlow = new CommonFlow(page);
        const registerPageFlow = new RegisterPageFlow(page);

        await commonFlow.gotoHomepage();
        await commonFlow.gotoRegisterPageFromHeaderDropdown();
        await registerPageFlow.verifyPageLabelsAndElements();
        await registerPageFlow.fillRegistrationForm(userData);
        await registerPageFlow.setRandomAvatarId();
        await registerPageFlow.submitRegisterForm();
    });

    test('Log in with a new user account', {tag: ['@e2e', '@userManagement']}, async ({page}) => {
        const loginPageFlow = new LoginPageFlow(page);
        const commonFlow = new CommonFlow(page);
        const accountPageFlow = new AccountPageFlow(page);

        await commonFlow.gotoHomepage();
        await commonFlow.gotoLoginPageFromHeaderDropdown();
        await loginPageFlow.verifyPageLabelsAndElements();
        await loginPageFlow.fillLoginForm(userData);
        await loginPageFlow.submitLoginForm();
        await accountPageFlow.verifyPageLabelVisibilityAndContent(userData);

        userID = await accountPageFlow.gotoMyProfileAndGetUserID();
        await accountPageFlow.verifyUserIDInURL(userID);
    });
});
