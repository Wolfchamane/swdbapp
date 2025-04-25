FROM node:22-alpine

ARG BACKEND_ACCEPT_ORIGIN
ARG BACKEND_PORT
ARG PG_PORT
ARG PG_HOST
ARG PG_USER
ARG PG_PASSWORD
ARG PG_DATABASE

ENV BACKEND_ACCEPT_ORIGIN=${BACKEND_ACCEPT_ORIGIN}
ENV BACKEND_PORT=${BACKEND_PORT}
ENV PGPORT=${PG_PORT}
ENV PGHOST=${PG_HOST}
ENV PGUSER=${PG_USER}
ENV PGPASSWORD=${PG_PASSWORD}
ENV PGDATABASE=${PG_DATABASE}

WORKDIR /usr/src/types
COPY ./types ./

WORKDIR /usr/src/utils/backend
COPY ./utils/backend ./

WORKDIR /usr/src/features/core
COPY ./features/core ./

WORKDIR /usr/src/features/eras/infra-http
COPY ./features/eras/infra-http ./

WORKDIR /usr/src/features/eras/backend
COPY ./features/eras/backend ./

WORKDIR /usr/src/features/titles/infra-http
COPY ./features/titles/infra-http ./

WORKDIR /usr/src/features/titles/backend
COPY ./features/titles/backend ./

WORKDIR /usr/src/apps/backend
COPY ./apps/backend ./

WORKDIR /usr/src
COPY package*.json .
RUN npm i -g npm
RUN npm ci

WORKDIR /usr/src/apps/backend
EXPOSE 3000
CMD ["npm", "start"]
