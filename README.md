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
PORT=8080
DARKSKY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Development
```$xslt
npm run dev
```
It runs server on port 8080, watches files with nodemon.

```$xslt
npm run front
``` 
It runs webpack to watch front files and use browser-sync  on port 3000 for hot reload.
Open [localhost:3000](http://localhost:3000) to start working.

## Production

```$xslt
npm run build
npm start
```

It copy necessary files in dist and public folders, build server and client files.
Then it runs the node server on port 8080.
Open [localhost:8080](http://localhost:8080) to see it in action.