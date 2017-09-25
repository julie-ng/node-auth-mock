FROM node:7
MAINTAINER Julie Ng <me@julie.io>

WORKDIR /workspace

COPY ["package.json", "./"]

RUN npm install

COPY ["src/", "/workspace/src/"]
