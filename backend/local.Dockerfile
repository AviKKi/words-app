FROM node:14.17

WORKDIR /src

RUN npm install -g nodemon

RUN npm install -g typescript

EXPOSE 4040 5550