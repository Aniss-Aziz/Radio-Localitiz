# Docker + Django + MySQL + Nginx

The most scalable way to deploy a Django project with MySql

## Deployment

- Rename *.env.sample* to *.env* and *.env.sh.sample* to *.env.sh*
- Update the environment variables in the *.env* and *.env.sh* files
- Set the same project name in both *scripts/reset-dockers.sh* and *.env*
- Build the images and run the containers:
```bash
  scripts/reset-dockers.sh
```

## First Deployment

After following the previous steps, you need to create a superuser to connect to the admin:
```bash
  docker-compose -f docker-compose.{ENV}.yml run --rm app sh -c "python manage.py createsuperuser"
```
Replace *{ENV}* by *"local"* or *"prod"*.

## Local

- Test it out at http://127.0.0.1:8000
- The "app" folder is mounted into the container and your code changes apply automatically


## Prod

- Test it out at http://127.0.0.1
- No mounted folders. Re-build the container to apply changes
```bash
  scripts/reset-dockers.sh
```
- Static files are rendered by nginx

## Customization

If you have more than two environments, you’ll have to create a new *docker-compose.{ENV}.yml* for each. The file *app/scripts-shellwait.sh* might also need some tweaks to define the rendering rules. By default, the Django server is used on local, other environments use the reverse proxy with nginx to render static files.

## Exporter une image docker

Dans le terminal
```bash
  docker images
  docker save REPOSITORY:TAG > NAME.tar
```

## Importer une image docker
Dans le terminal
```bash
  docker load < NAME.tar
```

## Utile

Dans le terminal entrer dans le container
```bash
  docker ps
  docker exec -it NAME_DU_CONTAINER /bin/sh
```

Préparer une migration
```bash
  manage.py makemigrations
```

Exécuter la migration
```bash
  manage.py migrate
```

Création d'une APP
```bash
  django-admin startapp 
```
Déplacer l'APP dans le dossier souhaité.

Modifier le fichier "apps.py"

Ajouter l'APP dans setting.py
