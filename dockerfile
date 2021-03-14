FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3001

CMD npm run start