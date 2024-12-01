export interface URLConfig {
    homepageURL: string;
    loginAndRegisterPageURL: string;
    productsPageURL: string;
    cartPageURL: string;
    contactUsPageURL: string;
}

export interface APIConfig {
    verifyLoginEndpoint: string;
    deleteUserEndpoint: string;
}

export interface EnvConfig {
    URL: URLConfig;
    API: APIConfig;
}
