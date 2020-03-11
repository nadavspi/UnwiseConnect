FROM node:12-alpine
LABEL maintainer="Nadav Spiegelman <me@nadav.name>"

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

ENTRYPOINT yarn start
