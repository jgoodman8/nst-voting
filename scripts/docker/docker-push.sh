#!/usr/bin/env bash
set -e

username='elearningteamgrd'
app_name='netexlearning/smart-classroom-ui'
tag=':latest'
if [ $1 ]; then tag=$1; fi

if [ $DOCKER_PASSWORD ]; then OPTS="-p=${DOCKER_PASSWORD}"; fi

docker login -u $username $OPTS
docker push $app_name$tag
docker logout
