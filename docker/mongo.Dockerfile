FROM mongo:7.0.6-jammy

COPY ./docker/configsCollection.json .
COPY ./docker/seed.sh /docker-entrypoint-initdb.d/seed.sh
COPY ./docker/init.js /docker-entrypoint-initdb.d/init.js


ENV MONGO_INITDB_ROOT_USERNAME: cadmin
ENV MONGO_INITDB_ROOT_PASSWORD: cadmin
ENV MONGO_INITDB_DATABASE: configDB