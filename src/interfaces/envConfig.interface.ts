export interface URLConfig {
    accountURL: string;
    homepageURL: string;
    loginURL: string;
    registerURL: string;
}

export interface APIConfig {
    loginUserAPI: string;
    deleteUserAPI: string;
    getUserAPI: string;
}

export interface EnvConfig {
    URL: URLConfig;
    API: APIConfig;
}
