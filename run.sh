#!/bin/sh

# Build container
# ttab  -a iTerm2 

docker-compose down

docker-compose build
docker-compose up


#docker save 19885890b442 | bzip2 | pv | ssh  -p 1337 root@vps316332.ovh.net:/home 'bunzip2 | docker load'