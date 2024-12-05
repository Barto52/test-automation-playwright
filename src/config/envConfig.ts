import {EnvConfig} from '@_src/interfaces/envConfig';

export const envConfig: EnvConfig = {
    URL: {
        homepageURL: 'http://localhost:3000',
        registerURL: 'http://localhost:3000/register.html',
    },
    API: {
        deleteUserAPI: 'http://localhost:3000/api/users/{id}',
    },
};
