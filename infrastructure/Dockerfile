FROM node:10.8.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080

CMD [ "npm start" ]