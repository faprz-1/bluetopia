#bash

repoFolderName="template4.0"
cd /home/$SSH_DEVELOP_USER/$repoFolderName/deploy-pm2

source config-dev.sh
echo "estoy en $PWD"
echo "deberia en $ProjectFullPath"

echo "Liberando $project en $type"
cd $ProjectFullPath
echo "Trayendo ultimo commit"
git pull
echo "Copiando compiledAngular a nginx" # si es mas de un front... duplicar aqui.
rm -rf $Front_nginxFolder
sudo cp -R $sourceHtmlFolder $Front_nginxFolder
echo "Front Actualizado"
echo "Reiniciando PM2"
pm2 restart $project
echo "Parece que ya se reinicio todo Felicidades"
