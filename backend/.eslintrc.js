module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        'max-len': ['error', { code: 140 }],
        'no-console': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx'] }],
        'react/state-in-constructor': ['warn', 'never'],
        'react/prefer-stateless-function': ['warn'],
        'react/destructuring-assignment': ['warn', 'always', { ignoreClassFields: true }],
        'import/prefer-default-export': 'off',
        'import/default': 'off',
        'import/order': ['warn', { alphabetize: { order: 'asc' } }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                mjs: 'never',
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/'],
            },
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
