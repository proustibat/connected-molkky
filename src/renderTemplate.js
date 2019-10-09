import serialize from 'serialize-javascript';
import {renderToString} from 'react-dom/server';

const renderTemplate = Component => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>React SSR</title>
            <link rel="stylesheet" href="/stylesheets/normalize.css" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
            <link rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        
        <body>
            <div id="root">${renderToString(Component)}</div>
            <script>window.__INITIAL_PROPS__ = ${serialize(Component.props || {})}</script></body>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script src="./javascript/babel-polyfill.min.js"></script>
            <script src="./javascript/index.min.js"></script>
        </body>
        </html>
    `;

export default renderTemplate;