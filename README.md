Template Aplicación de JarabeSoft - Versión 3.0

Requisitos: 
    - docker
    - docker-compose
    - nodejs (10.x LTS o versión estable)
    - Módulos npm:
        - @angular/cli
        - loopback-cli
        - ionic
        - corvoda

Pasos:
    1. Clonar repositorio

    2. Ejecutar el siguiente comando para inicializar containers de docker:
        docker-compose -f docker-compose-dev.yml up -d --build
    
    3. Inicializar Angular: 
        ng serve

    4. Inicializar servidor de pruebas de Ionic (sin Cordova) (opcional)
        ionic serve

Se pueden encontrar más comandos útiles en los archivos docker-dev.txt y docker-prod.txt