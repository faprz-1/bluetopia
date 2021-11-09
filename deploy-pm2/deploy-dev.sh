#bash
cd $ProjectFullPath/deploy-pm2
pwd
source config-dev.sh

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
