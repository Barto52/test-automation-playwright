import {test} from '@playwright/test';

import {AccountPageFlow} from '@_flow/accountPage.flow';
import {CommonFlow} from '@_flow/common.flow';
import {LoginPageFlow} from '@_flow/loginPage.flow';
import {RegisterPageFlow} from '@_flow/registerPage.flow';
import {UserDataFactory} from '@_src/factory/generateUserData.factory';
import {authenticateAndGetBearerToken, checkIfUserExistsByID, deleteUserWithAPI} from '@_src/helpers/api.helper';

test.describe('User Management', {tag: '@userManagement'}, () => {
    let userDataFactory;
    let userData;
    let loginPageFlow;
    let commonFlow;
    let registerPageFlow;
    let accountPageFlow;

    test.beforeAll(async ({page}) => {
        userDataFactory = new UserDataFactory();
        userData = userDataFactory.generateUserData();
        loginPageFlow = new LoginPageFlow(page);
        commonFlow = new CommonFlow(page);
        registerPageFlow = new RegisterPageFlow(page);
        accountPageFlow = new AccountPageFlow(page);
    });
    test.afterAll(async () => {
        if (!userData.id) {
            console.info(`User does not exist, skipping "afterAll" cleanup.`);
        }

        try {
            const bearerToken = await authenticateAndGetBearerToken(userData);
            const userExists = await checkIfUserExistsByID(userData);
            if (userExists) {
                console.info(`User ${userData.id} exists, cleaning up.`);
                await deleteUserWithAPI(userData, bearerToken);
            } else {
                console.info(`User ${userData.id} does not exist, skipping "afterAll" cleanup.`);
            }
        } catch (error) {
            console.error(`Error during cleanup for user ${userData.id}:`, error);
        }
    });

    test('Login with an unregistered user', {tag: ['@e2e', '@userManagement']}, async ({}) => {
        await commonFlow.gotoHomepage();
        await commonFlow.gotoLoginPageFromHeaderDropdown();
        await loginPageFlow.verifyPageLabelsAndElements();
        await loginPageFlow.fillLoginForm(userData);
        await loginPageFlow.submitLoginAndVerifyAlertContent();
    });

    test('Register a new user via UI', {tag: ['@e2e', '@userManagement']}, async ({}) => {
        await commonFlow.gotoHomepage();
        await commonFlow.gotoRegisterPageFromHeaderDropdown();
        await registerPageFlow.verifyPageLabelsAndElements();
        await registerPageFlow.fillRegistrationForm(userData);
        await registerPageFlow.setRandomAvatarId();
        await registerPageFlow.submitRegisterForm();
    });

    test('Login with a registered user', {tag: ['@e2e', '@userManagement']}, async ({}) => {
        await commonFlow.gotoHomepage();
        await commonFlow.gotoLoginPageFromHeaderDropdown();
        await loginPageFlow.verifyPageLabelsAndElements();
        await loginPageFlow.fillLoginForm(userData);
        await loginPageFlow.submitLoginAndRedirectToAccountPage();
        await accountPageFlow.verifyPageLabelVisibilityAndContent(userData);
        await accountPageFlow.gotoMyProfileAndGetUserID(userData);
        await accountPageFlow.verifyUserIDInURL(userData.id);
    });
    test('Delete registered user with API', {tag: ['@api', '@userManagement']}, async ({}) => {
        const bearerToken = await authenticateAndGetBearerToken(userData);
        await checkIfUserExistsByID(userData);
        await deleteUserWithAPI(userData, bearerToken);
        await checkIfUserExistsByID(userData);
    });
});
