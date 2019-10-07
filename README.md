# Node Hue Prstbt

## Prerequisites
Be sure Node and npm are installed.

## Install

```$xslt
git clone git@github.com:proustibat/node-hue-prstbt.git
cd node-hue-prstbt
npm i
```

## Configuration
Create a `.env` file at the root of the project as follows (replace variables depending on your environment):

```$xslt
NODE_ENV=development
SERVER_PORT=8080
BS_PORT=3000
DARKSKY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Development
```$xslt
npm run dev
```
It runs server on port SERVER_PORT (8080), watches files with nodemon and use browser-sync on BS_PORT (3000) for hot reload.

```$xslt
npm run front
``` 
It runs webpack to watch front files and serve assets on browser-sync port (BS_PORT: 3000)
Open [localhost:3000](http://localhost:3000) to start working.

### How To

#### Create a new route

##### With PUG
This example assumes you want to create a new page at the url '/hello'.

1. Create `src/routes/hello/index.js`:
    ```$xslt
    import express from 'express';
    const router = express.Router();
    
    router.get('/', (req, res) => {
        res.render('hello', {title: 'Hello'});
    });
    
    module.exports = router;
    ```

2. Add new created route to `src/routes/_.js`: 
    ```$xslt
    // ...
    import hello from './hello';
    
    export default {
        // ...,
        hello
    };
    ```

3. Create the view `src/views/hello.pug`:
    ```$xslt
    extends layout
    
    block content
      h2 This is my new route
    block specificJS
      script(src='/javascript/hello.min.js')
    ```

    Note here we add a specific javascript file if the page needs specific scripts. This is optional!

4. Add specific javascript for the new page (optional): 
  * Create `src/front/hello.js`:
    ```$xslt
    console.log('hello');
    ```
  * Add the js entry to webpack config in `webpack.config.js` (in the entry part):
    ```$xslt
    entry: {
        // ...,
        hello: ['@babel/polyfill', './src/front/hello.js'],
    },
    ```

You can run [localhost:3000/hello](http://localhost:3000/hello).

##### With React and SSR
This example assumes you want to create a new page at the url '/hello'.

1. Create the view in `src/front/pages/Hello` :
    ```$xslt
    import React from 'react';
    
    export default class Hello extends React.Component {
        onClick = () => {
          window.alert('click');
        };
        render() {
            return (
                <div>
                    <h1>{ this.props.title }</h1>
                    <h2>This is my react page</h2>
                    <a className="waves-effect waves-light btn-large" onClick={this.onClick} >Click me</a>
                </div>
            );
        }
    }
    ```

2. Create the route in `src/routes/hello/index.js`:
    ```$xslt
    import express from 'express';
    import React from 'react';
    import {renderToString} from 'react-dom/server';
    import renderTemplate from '../../renderTemplate';
    import Hello from '../../front/pages/Hello';
    
    const router = express.Router();
    
    router.get('/', (req, res) => {
        const data = {title: 'hello world!'};
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( renderTemplate( renderToString(<Hello {...data} />),  data, 'hello') );
    });
    
    module.exports = router;
    ```

3. Add new created route to `src/routes/_.js`: 
    ```$xslt
    // ...
    import hello from './hello';
    
    export default {
        // ...,
        hello
    };
    ```

4. Create the javascript for client in `src/front/hello.js`:
    ```$xslt
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Hello from './pages/Hello';
    
    const app = document.getElementById( 'root' );
    
    ReactDOM.hydrate( <Hello {...window.__INITIAL_PROPS__} />, app );
    ```

5. Add the js entry to webpack config in `webpack.config.js` (in the entry part):
    ```$xslt
       entry: {
           // ...,
           hello: ['@babel/polyfill', './src/front/hello.js'],
       },
    ```

You can run [localhost:3000/hello](http://localhost:3000/hello).

#### Create a sub route
This example assumes a route `/hello` exists, you wanna create `/hello/world`:

Simply add this into `src/routes/hello/index.js`:
```$xslt
router.get('/world', (req, res) => {
    res.send('hello world');
});
```
You can run [localhost:3000/hello/world](http://localhost:3000/hello/world).

#### API
// TODO

## Production


```$xslt
npm run build
npm start
```

It copy necessary files in dist and public folders, build server and client files.
Then it runs the node server on port 8080.
Open [localhost:8080](http://localhost:8080) to see it in action.