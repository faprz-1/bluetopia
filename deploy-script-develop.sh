#!/bin/bash
export PROYECT=template4.0

echo "Switching dir to proyect: $PROYECT"
cd ~/repos/$PROYECT

echo "Setting Rep"
#git reset --hard
git checkout master
git pull

echo "Removing old docker containers"
sudo docker-compose -f docker-compose-dev.yml down --rmi all

echo "Rebuilding docker containers"
sudo docker-compose -f docker-compose-dev.yml up -d --build