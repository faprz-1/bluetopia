#bash
source config-dev.sh
nginxSting="server { \n
	server_name $Front_domain;\n
\n
	root /var/www/$Front_domainFolder;\n
\n
	index index.html;\n
\n
	location / {\n
		try_files \$uri \$uri/ =404;\n
	}\n
}\n"