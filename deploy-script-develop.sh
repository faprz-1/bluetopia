#!/bin/bash

cd ~/repos/template4.0
#git reset --hard
git checkout master
git pull

sudo docker-compose -f docker-compose-dev.yml down --rmi all
sudo docker-compose -f docker-compose-dev.yml up -d --build