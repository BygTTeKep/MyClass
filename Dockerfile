FROM mirror.gcr.io/library/node:current-alpine3.21

COPY . /app

WORKDIR /app

RUN npm i

CMD [ "npm", "run", "start" ]