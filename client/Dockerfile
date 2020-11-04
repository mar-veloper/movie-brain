FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY . .
RUN yarn

CMD ["yarn", "start"]