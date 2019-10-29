module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    rules: {
        'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx']}],
        'react/jsx-props-no-spreading': ['off'],
        'no-underscore-dangle': ['error', {
            allow: [
                '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
                '__INITIAL_PROPS__'
            ],
            "allowAfterThis": true
        }],
        'no-unused-expressions': ['error', {allowShortCircuit: true}],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/static-property-placement': ['error', 'static public field'],
        'react/forbid-prop-types': ['error', {
            forbid: ['any', 'array'],
            checkContextTypes: true,
            checkChildContextTypes: true,
        }],
        'import/order': ['off'],
        'sort-imports': ['warn'],
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.config.js'
            },
        }
    }
};