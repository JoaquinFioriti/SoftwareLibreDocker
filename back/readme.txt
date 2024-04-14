Para lograr la comunicacion entre los diferentes contenedores fue necesario crear una red en docker
que permita reemplazar las ipv4, por alias. Entonces cuando creamos los contenedores, los conectamos
a esta nueva red, y ademas les damos el alias (igual al nombre del contenedor).


####Para crear la red de docker, ejecutar este comando:
docker network create --driver bridge nueva_red


####Para crear la BBDD, ejecutar este comando:
docker run -d --network=nueva_red --network-alias=container_db  --name container_db -p 5984:5984 -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password couchdb

####Para crear el backend, ejecutar este comando:
docker run --network=bridge  --name=tp_docker_backend  -p 3000:3000 -d tp_docker_backend:0.0.0