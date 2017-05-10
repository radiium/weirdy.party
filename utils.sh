#!/bin/zsh
### BEGIN INIT INFO
# Provides:          <NAME>
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Description:       <DESCRIPTION>
### END INIT INFO

LOCAL_BASE=/Users/amigamac/workspace/Site-Internet/weirdy.party/weirdy
REMOTE_BASE=/var/www/weirdy.party

BUILD=/dist
CLIENT=/client
SERVER=/server




# Deploy APP
deployApp() {
    echo "DEPLOY weirdy.party APP" >&2
    ds
    echo -n "Are you really sure? [y|N] "
    local SURE
    read SURE
    if [ "$SURE" = "y" ]; then
        echo "// Deploy SERVER" >&2
        rsync -avzP -e 'ssh -p 1337' .$SERVER/* root@vps316332.ovh.net:$REMOTE_BASE$SERVER
        ssh -p 1337 root@vps316332.ovh.net 'cd /var/www/radiium.space/server; ls -la; pm2 stop 0; pm2 start server.js --watch'
    fi
    echo "Ciao" >&2
}

# Remove all .DS_Store files
ds() {
    find . -name ".DS_Store" -delete
    echo '.DS_Store removed' >&2
}

case "$1" in
    app)
        deployApp
        ;;
    ds)
        ds
        ;;
    *)
    echo "Usage: $0 \n  app: Deploy APP\n   ds: Remove .DS_store}"
    ;;
esac
echo "Ciao" >&2
