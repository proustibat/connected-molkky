# Node Hue Prstbt 
[![CircleCI](https://circleci.com/gh/proustibat/node-hue-prstbt/tree/master.svg?style=svg&circle-token=21b2ae139645a4668edc9ffe79e369ce75c63e2d)](https://circleci.com/gh/proustibat/node-hue-prstbt/tree/master)

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

4. Add specific javascript for the new page (optional) by creating `src/front/hello.js`: 
    ```$xslt
    console.log('hello');
    ```
   and adding it to `webpack.config.js` in the entry part:
   ```$xslt
    hello: ['./src/front/hello.js']
   ``` 

Stop and re-run `npm run front` if it was running when creation the file.

You can run [localhost:3000/hello](http://localhost:3000/hello).

##### With React and SSR
This example assumes you want to create a new page at the url '/hello'.

1. Create the view in `src/front/pages/Hello/index.js` :
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
    import renderTemplate from '../../renderTemplate';
    import Hello from '../../front/pages/Hello';
    
    const router = express.Router();
    
    /* GET hue page. */
    router.get('/', (req, res) => {
      const data = {title: 'Hello World'};
      res.writeHead( 200, { "Content-Type": "text/html" } );
      res.end(renderTemplate(<Hello {...data} />));
    });
    
    module.exports = router;
    ```
   Note that `data` will be the props of the component.

3. Add new created route to `src/routes/_.js`: 
    ```$xslt
    // ...
    import hello from './hello';
    
    export default {
        // ...,
        hello
    };
    ```

4. Declare the javascript file for client in the constructor of the App (`src/front/App.js`):
   Import your component: 
   ```$xslt
   // Import your component
   import Hello from './pages/Hello';
   ```
   In the constructor, add your object to the routeComponentMapper array as follows with the right pathname: 
   ```$xslt
    this.routeComponentMapper = [
        //..., 
        {
            isMatching: pathname => pathname === '/hello',
            component: Hello
        },
        {
            isMatching: () => true,
            component: null
        }
    ];
    ```
   
   Note the order of the array is important and also the last object that defines the default behavior.


You can run [localhost:3000/hello](http://localhost:3000/hello) and the button should display an alert when it's clicked.

#### Create a sub route

##### With Pug
This example assumes a route `/hello` exists, you wanna create `/hello/champion`:
1. Add the route in `src/routes/hello/index.js`:
    ```$xslt
    router.get('/champion', (req, res) => {
        res.render('champion', {title: 'Hello Champion!'});
    });
    ```
   
2. Create the view `src/views/champion.pug`:
    ```$xslt
    extends layout
    
    block content
      h2 This is my sub route with PUG!
    block specificJS
      script(src='/javascript/champion.min.js')
    ```
   
   Note here we add a specific javascript file if the page needs specific scripts. This is optional!

2. Add specific javascript for the new page (optional) by creating `src/front/champion.js`: 
    ```$xslt
    console.log('champion');
    ```
   and adding it to `webpack.config.js` in the entry part:
   ```$xslt
    champion: ['./src/front/champion.js']
   ``` 
   
Stop and re-run `npm run front` if it was running when creation the file.

You can run [localhost:3000/hello/champion](http://localhost:3000/hello/champion).

##### With SSR
This example assumes a route `/hello` exists, you wanna create `/hello/world`:

1. Create the view in `./src/front/pages/Hello/World/index.js`:
    ```$xslt
    import React from 'react';
    
    export default class HelloWorld extends React.Component {
        onClick = () => {
            window.alert('hello subpage');
        };
        render() {
            return (
                <div>
                    <h1>{ this.props.title }</h1>
                    <h2>This is my sub page</h2>
                    <a className="waves-effect waves-light btn-large" onClick={this.onClick} >Click me</a>
                </div>
            );
        }
    }
    ```
   
2. Add this into `src/routes/hello/index.js` (and import `HelloWorld` component):
    ```$xslt
    router.get('/world', (req, res) => {
        const data = {title: 'Hello World 2'};
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end(renderTemplate(<HelloWorld {...data} />));
    });
    ```
  
3. Map route and component in `./src/front/App.js` (and import `HelloWorld` component):
    ```$xslt
    ...
    import HelloWorld from './pages/Hello/World';
    
    export default class App {
        constructor() {
            this.routeComponentMapper = [
            ..., {
                isMatching: pathname => pathname === '/hello/world',
                component: HelloWorld
            },
            ...];
            return this;
        }
        ...
    }
    ```

You can run [localhost:3000/hello/world](http://localhost:3000/hello/world) and the button should work.

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
