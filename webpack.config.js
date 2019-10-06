const path = require('path');

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
                target: 'http://localhost:3000', // this is the browsersync proxy
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