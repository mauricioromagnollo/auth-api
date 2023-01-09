FROM node:18.12.1

RUN apt-get update \
  && apt-get install -y curl git build-essential

USER node

WORKDIR /home/node/app

COPY package.json package-lock.json /home/node/app/

COPY . .
