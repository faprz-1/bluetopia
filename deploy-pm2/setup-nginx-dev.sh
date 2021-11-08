#bash
source config-dev.sh
source front-nginx-conf.sh

if [ ! -f /etc/nginx/sites-enabled/$Front_domain ]; then
 echo "intentando crear /etc/nginx/sites-enabled/$Front_domain"
 echo -e $nginxSting | sudo tee -a /etc/nginx/sites-enabled/$Front_domain
 echo "Ahora puedes agregarle el SSL con certbot, a darle."
else
 echo "Ya existe un archivo de configuracion."
fi

if [ ! -f /etc/nginx/sites-available/$Front_domain ]; then
 echo "intentando crear /etc/nginx/sites-available/$Front_domain"
 echo "Creando link simbolico"
 sudo ln -s /etc/nginx/sites-enabled/$Front_domain /etc/nginx/sites-available/$Front_domain
 else
  echo "Ya existe un link simbolico."
fi