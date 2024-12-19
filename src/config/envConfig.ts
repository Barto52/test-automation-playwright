import {EnvConfig} from '@_src/interfaces/envConfig.interface';

const envConfig: EnvConfig = {
    URL: {
        accountURL: 'http://localhost:3000/welcome',
        homepageURL: 'http://localhost:3000',
        loginURL: 'http://localhost:3000/login/',
        registerURL: 'http://localhost:3000/register.html',
    },
    API: {
        deleteUserAPI: 'http://localhost:3000/api/users/{id}',
    },
};

export default envConfig;
