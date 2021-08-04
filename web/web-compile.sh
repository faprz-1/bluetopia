creator=$(hostname)
angularConfiguration=$1
comand="ng build" 
logFile="builds-log.txt"


echo "----------------------------------------------------------------------------------------------------
[$creator] creando nueva version ambiente $angularConfiguration $(date)
----------------------------------------------------------------------------------------------------"
echo "----------------------------------------------------------------------------------------------------
[$creator] creando nueva version ambiente $angularConfiguration $(date)
----------------------------------------------------------------------------------------------------" > temp-$logFile
cat $logFile >> temp-$logFile
cat temp-$logFile > $logFile
rm temp-$logFile

echo "----------------------------------------------------------------------------------------------------"
echo "[$creator] Construyendo la aplicación... $comand -c $angularConfiguration"
echo "----------------------------------------------------------------------------------------------------"
$comand --prod -c $angularConfiguration

echo "----------------------------------------------------------------------------------------------------"
echo "[$creator] Deployment completo."
echo "----------------------------------------------------------------------------------------------------"
