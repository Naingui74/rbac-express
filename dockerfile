# Utiliser une image officielle de Node.js comme image de base
FROM node:18

# Installer netcat-openbsd
RUN apt-get update && apt-get install -y netcat-openbsd

# Créer un répertoire de travail pour l'application
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Copier le script de démarrage
COPY wait-for-mysql.sh .

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["./wait-for-mysql.sh"]