#bash

repoFolderName="template4.0"
cd ~/repos/$repoFolderName/deploy-pm2

source config-dev.sh
echo "estoy en $PWD"
echo "deberia en $ProjectFullPath"
cd $ProjectFullPath
echo "estoy en $PWD"


echo "Liberando $project en $type"
echo "Trayendo ultimo commit"
git pull
echo "Eliminando $Front_nginxFolder" # si es mas de un front... duplicar aqui.
sudo rm -rf $Front_nginxFolder
echo "Copiando compiledAngular a nginx" # si es mas de un front... duplicar aqui.
sudo cp -R $sourceHtmlFolder $Front_nginxFolder
echo "Front Actualizado"
echo "Reiniciando PM2"
pm2 restart $project
echo "Parece que ya se reinicio todo Felicidades"
