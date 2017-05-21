#!/bin/sh

# mongo --port 27017 -u "admini" -p "admini" --authenticationDatabase "admin"

DB_PATH=/Users/amigamac/workspace/web/weirdy.party/weirdy/data
#CONFIG_PATH=/Users/amigamac/workspace/web/weirdy.party/weirdy/deploy/db/mongo.conf




brew services stop mongodb
sudo killall -15 mongod

rm -rd $DB_PATH
mkdir -p $DB_PATH/db


ttab  -a iTerm2 mongod --dbpath $DB_PATH 
#--config=$CONFIG_PATH
# -w => new window
 
sleep 5


echo
echo 
echo "Adding admin user"
mongo admin <<'EOF'
use admin
var user = {
  "user": "admin",
  "pwd": "admin",
  roles: [{"role" : "userAdminAnyDatabase", "db" : "admin"}]
}
db.createUser(user);
exit
EOF


echo
echo 
echo "Adding weirdydb db and weirdydb user"
mongo admin -u admin -p admin <<'EOF'
use weirdydb
var user = {
  "user" : "yeah",
  "pwd" : "yeah",
  roles : [{"role": "readWrite", "db": "weirdydb"}]
}
db.createUser(user);
exit
EOF
#db.User.insert({username: "admin", password: "$2a$08$9JFr4y7X9l4xm7jva7pzIu1mfld1x7GNc1TjsJ2wOlAVxD5UO8/3C"})


echo "complete"
