# RBAC Express App

Ce projet est une application Node.js utilisant Express.js pour implémenter un système de contrôle d'accès basé sur les rôles (RBAC). Il utilise JWT pour l'authentification et l'autorisation, MySQL pour la base de données, et bcrypt pour le hachage des mots de passe.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement du projet](#lancement-du-projet)
- [Utilisation](#utilisation)
- [Technologies utilisées](#technologies-utilisées)
- [Auteur](#auteur)

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (facultatif, pour le développement local)

## Installation

Clonez le dépôt GitHub sur votre machine locale :

```sh
git clone https://github.com/Naingui74/rbac-express-app.git
cd rbac-express-app

Configuration
Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement nécessaires :

DB_HOST=mysql_container
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=my_database
JWT_SECRET=your_jwt_secret

```
```s
Lancement du projet
Pour lancer le projet avec Docker, exécutez les commandes suivantes 

docker-compose up --build

Cela construira les images Docker et démarrera les conteneurs pour l'application Node.js et la base de données MySQL.

```
```h
Utilisation
Inscription
Pour inscrire un nouvel utilisateur, envoyez une requête POST à l'URL suivante :

POST http://localhost:3000/api/register

Avec 

{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "password": "123456",
    "role": "USER"
}

Connexion
Pour connecter un utilisateur, envoyez une requête POST à l'URL suivante :

Corps de la requête (JSON) :

{
    "email": "john@example.com",
    "password": "123456"
}
```
Autres routes
Vous pouvez tester les autres routes définies dans userRoutes.js en utilisant des outils comme Postman ou cURL.

Exemple de requête GET
Pour tester une route GET, par exemple /api/users, vous pouvez configurer une requête GET dans Postman :

Ouvrez Postman.
Créez une nouvelle requête.
Sélectionnez GET comme méthode HTTP.
Entrez l'URL de la route que vous souhaitez tester, par exemple : http://localhost:3000/api/users.
Cliquez sur Send pour envoyer la requête.
```sh
Technologies utilisées
Node.js
Express.js
MySQL
JWT
bcrypt
dotenv
mysql2
body-parser
Docker
Docker Compose
Postman
Auteur
Ce projet a été réalisé par Naingui74. J'ai appris beaucoup de choses sur RBAC et comment l'implémenter dans une application Node.js, ainsi que sur l'utilisation de JWT pour l'authentification et l'autorisation, MySQL pour la base de données, et bien plus encore.

Merci d'avoir utilisé ce projet ! Si vous avez des questions ou des suggestions, n'hésitez pas à me contacter.

```