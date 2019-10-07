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

#### Work on an existing route
// TODO

#### Create a new route
// TODO

## Production

```$xslt
npm run build
npm start
```

It copy necessary files in dist and public folders, build server and client files.
Then it runs the node server on port 8080.
Open [localhost:8080](http://localhost:8080) to see it in action.