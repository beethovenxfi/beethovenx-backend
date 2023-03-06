FROM node:16-slim AS base

ENV APP_ROOT /app
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}

RUN apt-get update -y && apt-get install -y openssl

FROM base AS dependencies

COPY yarn.lock ./

RUN yarn

FROM dependencies AS build

COPY . .

CMD ["yarn","start:local"]