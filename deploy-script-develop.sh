#!/bin/bash

cd ~/repos/template4.0
git checkout master
git reset --hard
git pull

docker-compose -f docker-compose-dev.yml down --rmi all
cker-compose -f docker-compose-dev.yml up -d --build