import {expect, request} from '@playwright/test';

import envConfig from '@_src/config/envConfig';
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
    expect(response.status()).toBe(200);
    expect(responseJSON).toHaveProperty('access_token');

    return responseJSON.access_token;
}

export async function checkIfUserExistsByID(userID: string): Promise<void> {
    const getUserEndpoint = envConfig.API.verifyUserExistsAPI.replace('{{id}}', userID);
    const requestContext = await request.newContext();
    const response = await requestContext.head(getUserEndpoint);

    expect(response.status()).toBe(200);
}

export async function deleteUserWithAPI(userID: string, token: string): Promise<void> {
    const deleteUserEndpoint = envConfig.API.deleteUserAPI.replace('{{id}}', userID);
    const requestContext = await request.newContext();
    const response = await requestContext.delete(deleteUserEndpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
}
