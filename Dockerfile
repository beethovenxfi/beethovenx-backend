FROM node:16-slim AS base

ENV APP_ROOT /app
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

RUN apt-get update -y && apt-get install -y openssl

FROM base AS dependencies

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

FROM dependencies AS build

COPY . .

RUN yarn generate
RUN yarn prisma generate
RUN yarn build

CMD ["yarn", "start:prod"]