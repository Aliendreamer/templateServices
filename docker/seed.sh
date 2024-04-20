#!/bin/sh
MONGO_HOST="localhost"
MONGO_PORT="27017"
MONGO_USER="cadmin"
MONGO_PWD="cadmin"
MONGO_DATABASE="configDB"
COLLECTION="configs"

echo "Seeding MongoDB with data"
mongoimport --host=$MONGO_HOST --port=$MONGO_PORT --authenticationDatabase=admin --username=$MONGO_USER --password=$MONGO_PWD --collection="$COLLECTION" --db=$MONGO_DATABASE --drop --jsonArray --file=../configsCollection.json
echo "MongoDB seeded with data"