FROM node:16-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

CMD ["yarn","start:local"]