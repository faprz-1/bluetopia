#bash
source config-dev.sh
source front-nginx-conf.sh
echo "intentando crear /etc/nginx/sites-enabled/$Front_domain"
if [ ! -f /etc/nginx/sites-enabled/$Front_domain ]; then
    echo -e $nginxSting > /etc/nginx/sites-enabled/$Front_domain
    echo "Creando link simbolico"
    ln -s /etc/nginx/sites-enabled/$Front_domain /etc/nginx/sites-available/$Front_domain
    echo "Ahora puedes agregarle el SSL con certbot, a darle."
else
echo "Ya existe un archivo de configuracion."
fi