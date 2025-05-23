FROM node:22-alpine AS build_stage

ARG VITE_ASSETS_PATH
ARG VITE_API_KEY
ARG VITE_API_HOST
ARG VITE_API_PORT
ARG VITE_API_PROTOCOL

ENV VITE_ASSETS_PATH=${VITE_ASSETS_PATH}
ENV VITE_API_KEY=${VITE_API_KEY}
ENV VITE_API_HOST=${VITE_API_HOST}
ENV VITE_API_PORT=${VITE_API_PORT}
ENV VITE_API_PROTOCOL=${VITE_API_PROTOCOL}
ENV NODE_ENV=production

RUN npm i -g npm

WORKDIR /usr/src
COPY . .
RUN npm ci

WORKDIR /usr/src/apps/frontend/vue-js
RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html
COPY --from=build_stage /usr/src/apps/frontend/vue-js/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
