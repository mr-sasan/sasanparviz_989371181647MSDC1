FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

RUN npm run build

RUN npm install -g serve

EXPOSE 5000

CMD serve -s build