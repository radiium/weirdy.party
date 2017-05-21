#!/bin/sh

# Env
ADMIN_USER=admin
ADMIN_PASS=admin

DB=weirdydb
DB_USER=yeah
DB_PASS=yeah

# Build container
# ttab  -a iTerm2 
docker-compose down
docker-compose build
docker-compose up

sleep 1

docker exec db_mongodb mongo admin ./scripts/create-admin.js
docker exec db_mongodb mongo admin ./scripts/create-user.js -u admin -p admin --authenticationDatabase admin
