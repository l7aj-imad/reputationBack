# e-Reputation API

## Introduction

Ce dépôt contient le code source de l'API responsable de la gestion des notations/avis et de la réputation digitale d'un professionnel.

## Structure du dépôt

Le dépôt se structure de la manière suivante:
- digitalreputationapi/ qui contient le projet
- .gitlab-ci.yml qui permet de mettre en place l'intégration continue de gitlab en créant une pipeline qui va build l'image du projet à chaque push
  sous [l'addresse suivante](https://gitlab.com/digital-reputation/digitalreputationapi/container_registry/1534447) dans le [container registry](https://gitlab.com/groups/digital-reputation/-/container_registries).
- Dockerfile qui contient les instructions à appliquer pour construire l'image. On peut voir qu'on utilise une image Alpine qui est une distribution linux permettant de construire des images légères.

## Installation

Pour exécuter l'API, une base de données MongoDB est nécessaire. Il est possible d'utiliser une configuration Docker pour lancer la base de données sans aucune configuration nécessaire :
[Docker MongoDB](https://gitlab.com/RaphaelKimm/mongodb-init)

- Clonez ce dépôt avec:
```bash
$ git clone https://gitlab.com/digital-reputation/dirproinit.git
```

- Allez ensuite dans le dossier contenant docker-compose.yml, puis lancer le docker-compose:
```bash
$ docker-compose up
```

Le dossier digitalreputationapi/config contient les fichiers de configuration de l'API. Un point important concerne la configuration de la base de données :
```yaml
mongodb:
  login: 'root'
  password: 'password'
  host: '0.0.0.0'
  port: '27017'
  database: 'digrep'
  uri_prefix: 'mongodb://'
  uri_suffix: '?authSource='
  authdb: 'admin'
```
Si vous avez modifié les informations de connexion pour la base de données locale, il faut les référencer dans cette partie, surtout en ce qui concerne host (adresse IP), login et password.

- Quand vous testez l'application en local, il faut modifier l'adresse de connexion à la base de données mongo qui se trouve dans [le fichier de configuration](https://gitlab.com/digital-reputation/digitalreputationapi/-/blob/master/digitalreputationapi/config/default.yml) à la ligne 19 et remplacer mongo par 0.0.0.0, mongo est utilisé lors du déploiement puisqu'il permet de se connecter au container mongo qui contient la base de données. (donc ça doit rester mongo sur la branche master)

- Si vous souhaitez juste tester l'application, vous pouvez aussi utiliser docker de la manière suivante:
```bash
# À la racine du projet, faites
$ docker build -t digrepapi .
$ docker run -p 3001:3001 digrepapi
```

- Pour développer, vous aurez besoin au minimum node.js (14) et de nest (11)

- Il faut installer les dépendances avec yarn ou npm:
```bash
# Avec npm
$ npm install
# Ou avec yarn
$ yarn install
```

- Vous devriez donc avoir les dépendances suivantes:
```bash
$ nest info

 _   _             _      ___  _____  _____  _     _____
| \ | |           | |    |_  |/  ___|/  __ \| |   |_   _|
|  \| |  ___  ___ | |_     | |\ `--. | /  \/| |     | |
| . ` | / _ \/ __|| __|    | | `--. \| |    | |     | |
| |\  ||  __/\__ \| |_ /\__/ //\__/ /| \__/\| |_____| |_
\_| \_/ \___||___/ \__|\____/ \____/  \____/\_____/\___/


[System Information]
OS Version     : Windows 10
NodeJS Version : v14.15.1
NPM Version    : 6.14.8

[Nest CLI]
Nest CLI Version : 7.5.4

[Nest Platform Information]
platform-fastify version : 7.6.1
mongoose version         : 7.0.2
swagger version          : 4.7.5
common version           : 7.6.11
core version             : 7.5.1
```

- Vous pouvez alors lancer le projet avec la commande suivante:
```bash
$ nest start
```

- Vous pouvez tout aussi bien utiliser yarn ou npm
```bash
# Avec npm
$ npm run start
# Ou avec yarn
$ yarn run start
```

- Une fois la compilation et la mise en place terminée, vous devriez avoir l'affichage suivant dans la console:
```
> nest start

[Nest] 43720   - 08/03/2021 à 02:19:22   [NestFactory] Starting Nest application...
[Nest] 43720   - 08/03/2021 à 02:19:22   [InstanceLoader] AppModule dependencies initialized +59ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [InstanceLoader] MongooseModule dependencies initialized +0ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [InstanceLoader] MongooseCoreModule dependencies initialized +57ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [InstanceLoader] MongooseModule dependencies initialized +5ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [InstanceLoader] CommentsModule dependencies initialized +2ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [RoutesResolver] CommentsController {/comments}: +51ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [RouterExplorer] Mapped {/comments/numberOfCommentsPerSource, GET} route +3ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [RouterExplorer] Mapped {/comments/mostCommentedProfessionals, GET} route +1ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [RouterExplorer] Mapped {/comments/:id, GET} route +1ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [RouterExplorer] Mapped {/comments/:id/stats, GET} route +1ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [NestApplication] Nest application successfully started +2ms
[Nest] 43720   - 08/03/2021 à 02:19:22   [bootstrap] Application served at http://0.0.0.0:3001 +1ms
{"level":30,"time":1615166362533,"pid":43720,"hostname":"REYNAULT","msg":"Server listening at http://0.0.0.0:3001"}
```

- Vous pouvez désormais accéder à l'API à l'addresse: http://localhost:3001/
- Mais nous vous conseillons de d'abord vous familiariser avec ce qui a été fait avec la documentation Swagger qui a également été mise en place et qui est disponible à l'addresse: http://localhost:3001/documentation


## Environnement de développement

Pour l'environnement de développement, nous vous conseillons d'utiliser WebStorm.
Pour ce faire, importez le projet dirproapp, et ajoutez une configuration de lancement :

![Edit configurations](https://i.ibb.co/hKszdc0/edit-configurations-api-ereputation.png)

Ajoutez une nouvelle configuration configurée de cette façon, et donnez-lui un nom :

![Add new configuration](https://i.ibb.co/5xvhPyt/configuration-ereputation.png)

Le package.json du projet doit être sélectionné.

## Équipe

Client :
- Fabien Guy

IT consultant :
- Simon Hadjek

Dev team :

- Alexis cesaro
- Angela Ipseiz
- Nicolas Kleinhentz
- Maxime Nicolas
- Maxime Barbier
- Emilien Lambert
- Dylan Li-Cho
- Reynault Sies

Nouvelle dev team :

- Raphaël Kimm
- Alexis Richer
- Gady Emanuel
- Nada Madad (Scrum Master)
- Maéla Laconi