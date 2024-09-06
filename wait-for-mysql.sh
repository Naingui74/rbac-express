#!/bin/sh

# Attendre que MySQL soit prêt
while ! nc -z mysql 3306; do
    echo "En attente de MySQL..."
    sleep 1
done

# Démarrer l'application Node.js
node index.js