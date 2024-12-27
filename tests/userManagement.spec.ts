import {test} from '@playwright/test';

import {AccountPageFlow} from '@_flow/accountPage.flow';
import {CommonFlow} from '@_flow/common.flow';
import {LoginPageFlow} from '@_flow/loginPage.flow';
import {RegisterPageFlow} from '@_flow/registerPage.flow';
import {UserDataFactory} from '@_src/factory/generateUserData.factory';
import {authenticateAndGetBearerToken, checkIfUserExistsByID, deleteUserWithAPI} from '@_src/helpers/api.helper';

test.describe('User Management', {tag: '@userManagement'}, () => {
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

    test('Login with a registered user', {tag: ['@e2e', '@userManagement']}, async ({page}) => {
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
    test('Delete registered user with API', {tag: ['@api', '@userManagement']}, async ({}) => {
        const bearerToken = await authenticateAndGetBearerToken(userData);
        await checkIfUserExistsByID(userID);
        await deleteUserWithAPI(userID, bearerToken);
    });
});
