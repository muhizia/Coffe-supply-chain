FROM node:18-alpine as base

WORKDIR /src
ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}
COPY package*.json /
RUN npm install -g knex
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
RUN npm install -g knex
COPY . /
CMD ["nodemon", "bin/www"]