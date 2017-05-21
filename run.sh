#!/bin/sh

# Build container
# ttab  -a iTerm2 
docker-compose down
docker-compose build
docker-compose up
