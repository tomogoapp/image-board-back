<div style="text-align: center;">
  <p align="center">
    <img src="https://pbs.twimg.com/media/GFIxRE5X0AE0n6G?format=jpg"   alt="Nest Logo" style="width: 512px; display: block; margin: auto;"/>
  </p>
</div>


# IMAGE BOARD (BACK-END)

Proyecto basado en imageboards que se encuentran en internet

>[!WARNING]
>Antes de continuar, es necesario instalar [Docker](https://docs.docker.com/engine/install) en tu equipo o servidor


## INSTALACIÓN

1. Clonar el repositorio
2. Modificar el archivo .env.template
```
$ mv .env.template .env
```
3. Ejecutar
```
$ make build
```

## comandos en MakeFile

make up:
```
$ docker-compose up -d
```

make down:
```
$ docker-compose down
```

make build:
```
$ sudo rm -R postgres && docker-compose up --build
```

make logs:
```
$ docker-compose logs -f
```

make ps:
```
$ docker-compose ps
```

make restart:
```
$ docker-compose down && docker-compose up -d
```

make clean:
```
$ docker-compose down -v --rmi all --remove-orphans
```

make rebuild:
```
$ docker-compose down -v --rmi all --remove-orphans && docker-compose up --build -d
```

>[!NOTE]
>Estos comandos pueden ser moidificados dependiendo el caso de uso

### Stack usado
* PostgreSQL 
* NestJS
* Docker
* MinIO (almacenamiento local compatible con el SDK de S3 de Amazon)
* Typescript
* GraphQL