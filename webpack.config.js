const path = require('path');
const {BS_PORT} = require('./src/config');
module.exports = {
    entry: {
        index: ['@babel/polyfill', './src/front/index.js'],
        hue: ['@babel/polyfill', './src/front/hue.js']
    },
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