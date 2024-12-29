import {expect, request} from '@playwright/test';

import envConfig from '@_src/config/envConfig';
import {ApiResponseStatuses} from '@_src/enums/apiResponseStatuses.enum';
import {UserDataInterface} from '@_src/interfaces/userData.interface';

export async function authenticateAndGetBearerToken(userData: UserDataInterface): Promise<string> {
    const requestContext = await request.newContext();
    const response = await requestContext.post(envConfig.API.loginUserAPI, {
        data: {
            email: userData.email,
            password: userData.password,
        },
    });
    const responseJSON = await response.json();
    if (response.status() === 200) {
        expect(response.statusText()).toBe(ApiResponseStatuses.OK);
        expect(responseJSON).toHaveProperty('access_token');
        return responseJSON.access_token;
    } else {
        expect(response.status()).toBe(401);
        expect(response.statusText()).toBe(ApiResponseStatuses.Unauthorized);
    }
}

export async function checkIfUserExistsByID(userData: UserDataInterface): Promise<boolean> {
    const getUserEndpoint = envConfig.API.verifyUserExistsAPI.replace('{{id}}', userData.id);
    const requestContext = await request.newContext();
    const response = await requestContext.get(getUserEndpoint);

    if (response.status() === 200) {
        expect(response.statusText()).toBe(ApiResponseStatuses.OK);
        return true;
    } else if (response.status() === 404) {
        expect(response.statusText()).toBe(ApiResponseStatuses.UserNotFound);
        return false;
    } else {
        throw new Error('Invalid user ID is provided.');
    }
}

export async function deleteUserWithAPI(userData: UserDataInterface, token: string): Promise<void> {
    if (!token) {
        throw new Error('Access token is required but was not provided.');
    }

    const deleteUserEndpoint = envConfig.API.deleteUserAPI.replace('{{id}}', userData.id);
    const requestContext = await request.newContext();
    const response = await requestContext.delete(deleteUserEndpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe(ApiResponseStatuses.OK);
    console.info(`User ${userData.id} successfully deleted.`);
}
