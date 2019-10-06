const renderTemplate = (reactDom, data) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>React SSR</title>
            <link rel="stylesheet" href="/stylesheets/normalize.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
            <link rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script src="./javascript/index.min.js"></script>
        </body>
        </html>
    `;

export default renderTemplate;