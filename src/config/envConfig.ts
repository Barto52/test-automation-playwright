import {EnvConfig} from '@_src/interfaces/envConfig';

export const envConfig: EnvConfig = {
    URL: {
        homepageURL: 'https://automationexercise.com/',
        loginAndRegisterPageURL: 'https://automationexercise.com/login',
        productsPageURL: 'https://automationexercise.com/products',
        cartPageURL: 'https://automationexercise.com/view_cart',
        contactUsPageURL: 'https://automationexercise.com/contact_us',
    },
    API: {
        verifyLoginEndpoint: 'https://automationexercise.com/api/verifyLogin',
        deleteUserEndpoint: 'https://automationexercise.com/api/deleteAccount',
    },
};
