# Connected Molkky
[![CircleCI](https://circleci.com/gh/proustibat/connected-molkky/tree/master.svg?style=svg&circle-token=511d3d6891047a304594ef257911443a66a80519)](https://circleci.com/gh/proustibat/connected-molkky/tree/master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=proustibat_connected-molkky&metric=alert_status)](https://sonarcloud.io/dashboard?id=proustibat_connected-molkky)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=proustibat_connected-molkky&metric=coverage)](https://sonarcloud.io/dashboard?id=proustibat_connected-molkky)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=proustibat_connected-molkky&metric=code_smells)](https://sonarcloud.io/dashboard?id=proustibat_connected-molkky)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=proustibat_connected-molkky&metric=sqale_index)](https://sonarcloud.io/dashboard?id=proustibat_connected-molkky)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=proustibat_connected-molkky&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=proustibat_connected-molkky)

* [Prerequisites](#prerequisites)
* [Install](#install)
* [Configuration](#configuration)
* [Development](#development)
* [API](#api)
* [Testing and linting](#testing-and-linting)
* [Production](#production)
* [CI and quality reports](#ci-and-quality-reports)
* [Docker](#docker)
    + [Docker-compose to work locally](#docker-compose-to-work-locally)
    + [Docker images for production](#docker-images-for-production)
* [How To](#how-to)
    + [Create a new route](#create-a-new-route)
    + [Create a sub route](#create-a-sub-route)
    + [Use the react router with the express server side rendering](#use-the-react-router-with-the-express-server-side-rendering)
    + [Use MaterializeCSS javascript component in your React component](#use-materializecss-javascript-component-in-your-react-component)

***

## Prerequisites

Be sure [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) are installed.
We use [Yarn](https://yarnpkg.com/lang/en/) instead of npm but it doesn't matter.

## Install

```$xslt
git clone git@github.com:proustibat/connected-molkky.git
cd connected-molkky
yarn
```

## Configuration

Create a `.env` file at the root of the project as follows (replace variables depending on your environment):

```$xslt
NODE_ENV=development
SERVER_PORT=8888
BS_PORT=3000
```

## Development

```$xslt
yarn dev
```
It runs server on port SERVER_PORT (8888) and watches files with nodemon

```$xslt
yarn front
``` 
It runs webpack to watch front files.
Open [localhost:8888](http://localhost:8888) to start working.

## Testing and linting

```$xslt
yarn test
yarn lint --fix
```

## Production

```$xslt
yarn build
yarn start
```

It copy necessary files in dist and public folders, build server and client files.
Then it runs the node server on port 8888.
Open [localhost:8888](http://localhost:8888) to see it in action.

## API

[Endpoints are documented here on postman](https://documenter.getpostman.com/view/1117131/SW11Vxdm?version=latest)

You can find them or adding some in `src/server/routes/api`. Don't forget to add new api routes to the index file.


## CI and quality reports

- [CircleCI](https://circleci.com/gh/proustibat/connected-molkky)
- [SonarCloud](https://sonarcloud.io/dashboard?id=proustibat_connected-molkky)
- [PackTracker.io](https://app.packtracker.io/organizations/396/projects/300)

## Docker

### Docker-compose to work locally
// TODO

### Docker images for production
// TODO

***

## How To

### Create a new route

This example assumes you want to create a new page at the url '/hello'.

1. Create the view in `src/front/pages/Hello/index.js` :
    ```$xslt
    import React from 'react';
    export default () => <div>Hello</div>;
    ```

2. Create the route in `src/server/routes/pages/hello/index.js`:
    ```$xslt
    import Hello from '@pages/Hello';
    import React from 'react';
    import express from 'express';
    import renderTemplate from '@root/server/renderTemplate';
    
    const router = express.Router();
    
    router.get('/', (req, res) => {
      const data = { title: 'Hello World' };
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderTemplate(<Hello {...data} />));
    });
    
    module.exports = router;
    ```
   Note that `data` will be the props of the component.

3. Add new created route to `src/server/pages/routes/index.js`: 
    ```$xslt
    // ...
    import hello from './hello';
    
    export default {
        // ...,
        hello
    };
    ```

4. Declare the javascript file for client in the app (`src/front/App.js`):
   Import your component: 
   ```$xslt
   // Import your component
   import Hello from '@pages/Hello';
   ...
   ...
    }, {
      isMatching: (pathname) => pathname === '/hello',
      component: Hello,
    }, {
      isMatching: () => true,
      component: null,
    }];
    ```
   
   Note the order of the array is important and also the last object that defines the default behavior.


You can run [localhost:8888/hello](http://localhost:8888/hello) and the button should display an alert when it's clicked.

### Create a sub route

This example assumes a route `/hello` exists, you wanna create `/hello/world`:

1. Create the view in `./src/front/pages/Hello/World/index.js`:
    ```$xslt
    import React from 'react';
    export default () => <div>Hello World</div>;
    ```
   
2. Add this into `src/server/routes/hello/index.js`:
    ```$xslt
    ...
    import World from '@pages/Hello/World';
    ...
    
    router.get('/world', (req, res) => {
      const data = { title: 'Hello wub route' };
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderTemplate(<World {...data} />));
    });
    
    module.exports = router;
    ```
  
3. Map route and component in `./src/front/App.js`:
    ```$xslt
    ...
    import World from '@pages/Hello/World';
    ...
    
    export default class App {
      ...
          isMatching: (pathname) => pathname === '/hello/world',
          component: World,
        }, {
          isMatching: () => true,
          component: null,
        }];
      ...
    ```

You can run [localhost:8888/hello/world](http://localhost:8888/hello/world) and the button should work.

### Use the react router with the express server side rendering

// TODO

### Use MaterializeCSS javascript component in your React component

// TODO
