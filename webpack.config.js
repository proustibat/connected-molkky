const path = require('path');
const glob = require('glob');
const {BS_PORT} = require('./src/config');
module.exports = {
    entry: glob.sync('./src/front/*.js').reduce((acc, path) => {
        const entry = path.replace('./src/front/', '').replace('.js', '');
        acc[entry] = ['@babel/polyfill', path];
        return acc;
    }, {}),
    output: {
        path: path.join(__dirname, 'public', 'javascript'),
        filename: "[name].min.js"
    },
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:' + BS_PORT,
                secure: false
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};