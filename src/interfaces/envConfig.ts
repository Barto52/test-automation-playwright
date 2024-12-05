export interface URLConfig {
    homepageURL: string;
    registerURL: string;
}

export interface APIConfig {
    deleteUserAPI: string;
}

export interface EnvConfig {
    URL: URLConfig;
    API: APIConfig;
}
