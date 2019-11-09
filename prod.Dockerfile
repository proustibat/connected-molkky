FROM node:10

# Create app directory
WORKDIR /usr/src/connected-molkky

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ADD .env.prod .env
RUN npm run build
RUN npm install pm2 -g
EXPOSE 8080
##CMD [ "node", "dist/bin/www.js" ]
CMD ["pm2-runtime", "dist/bin/www.js"]