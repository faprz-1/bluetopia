creator=$(hostname)
angularConfiguration="staging"
comand="ionic cordova build" 
platform=$1
logFile="builds-log.txt"

if [ $platform = "android" ] 
then  
echo ""
elif [ $platform = "ios" ]
then
echo ""
else
echo "
----------------------------------
Añade la plataforma, '$platform' no es android o ios
----------------------------------" ; 
exit 1; 
fi

echo "----------------------------------------------------------------------------------------------------
[$creator] creando nueva version $platform ambiente $angularConfiguration $(date)
----------------------------------------------------------------------------------------------------"
echo "----------------------------------------------------------------------------------------------------
[$creator] creando nueva version $platform ambiente $angularConfiguration $(date)
----------------------------------------------------------------------------------------------------" > temp-$logFile
cat $logFile >> temp-$logFile
cat temp-$logFile > $logFile
rm temp-$logFile

echo "----------------------------------------------------------------------------------------------------"
echo "[$creator] Construyendo la aplicación... $comand $platform -c $angularConfiguration"
echo "----------------------------------------------------------------------------------------------------"
$comand $platform -c $angularConfiguration

echo "----------------------------------------------------------------------------------------------------"
echo "[$creator] Deployment completo."
echo "----------------------------------------------------------------------------------------------------"
