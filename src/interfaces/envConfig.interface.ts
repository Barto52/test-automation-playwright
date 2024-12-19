export interface URLConfig {
    accountURL: string;
    homepageURL: string;
    loginURL: string;
    registerURL: string;
}

export interface APIConfig {
    deleteUserAPI: string;
}

export interface EnvConfig {
    URL: URLConfig;
    API: APIConfig;
}
