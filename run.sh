#!/bin/sh

# Build container
# ttab  -a iTerm2 


composeDev() {
    docker-compose build
    docker-compose up
}

composeProd() {
    docker-compose build -f docker-compose-prod.yml
    docker-compose up -f docker-compose-prod.yml
}

# Down container
docker-compose down

case "$1" in
    dev)
        composeDev
        ;;
    prod)
        composeProd
        ;;

    *)
    echo "Usage: $0 \n  app: Deploy APP\n   ds: Remove .DS_store}"
    ;;
esac
echo "Ciao" >&2

#docker save 19885890b442 | bzip2 | pv | ssh  -p 1337 root@vps316332.ovh.net:/home 'bunzip2 | docker load'