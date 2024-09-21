#!/bin/sh

# Attendre que MySQL soit prêt
while ! nc -z mysql 3306; do
    sleep 1
done

# Démarrer l'application Node.js
npm start
