FROM node:22-alpine

ARG BACKEND_ACCEPT_ORIGIN
ARG BACKEND_PORT
ARG PG_PORT
ARG PG_HOST
ARG PG_USER
ARG PG_PASSWORD
ARG PG_DATABASE

WORKDIR /usr/src/infra/http
COPY ./infra/http ./
RUN npm ci

WORKDIR /usr/src/app
COPY ./backend ./
RUN echo "PGHOST=${PG_HOST}" >> .env
RUN echo "PGPORT=${PG_PORT}" >> .env
RUN echo "PGUSER=${PG_USER}" >> .env
RUN echo "PGPASSWORD=${PG_PASSWORD}" >> .env
RUN echo "PGDATABASE=${PG_DATABASE}" >> .env
RUN echo "BACKEND_ACCEPT_ORIGIN=${BACKEND_ACCEPT_ORIGIN}" >> .env
RUN echo "BACKEND_PORT=${BACKEND_PORT}" >> .env
RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
