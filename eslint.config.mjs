import pluginJs from '@eslint/js';
import eslintPluginPlaywright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {ignores: ['package-lock.json', 'playwright-report/**', 'test-results/**']},
    {files: ['**/*.{ ts}']},
    {languageOptions: {globals: globals.node}},
    pluginJs.configs.recommended,
    {
        rules: {
            'no-console': warn,
            'max-len': ['error', {code: 150}],
        },
    },
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
        },
    },
    eslintPluginPlaywright.configs['flat/recommended'],
    {
        rules: {
            'playwright/no-nested-step': 'off',
        },
        settings: {
            playwright: {
                globalAliases: {
                    test: ['setup'],
                },
            },
        },
    },
    eslintPluginPrettierRecommended,
];
