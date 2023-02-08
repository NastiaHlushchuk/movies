FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE ${APP_PORT}
CMD [ "npm", "start"]