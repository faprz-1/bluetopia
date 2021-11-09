#bash
project="Template4.0"
type="pm2 y nginx"
repoFolderName="template4.0"
repoPathName="~/repos/"
Front_domain="template.jarabepruebas.com"
Front_domainFolder="template_jarabe"
Front_nginxFolder="/var/www/$Front_domainFolder"

ProjectFullPath="$repoPathName$repoFolderName"
echo " ProjectFullPath = $repoPathName$repoFolderName : $ProjectFullPath"
sourceHtmlFolder="$ProjectFullPath/persistence/compiled_angular/staging"
echo "sourceHtmlFolder = $sourceHtmlFolder"
# sourceHtmlFolder="$ProjectFullPath/persistence/compiled_angular/prod"
