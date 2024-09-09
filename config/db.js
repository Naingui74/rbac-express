/*
** BOOUNCE PROJECT, 2024
** rbac-express
** File description:
** db.js
*/
require('dotenv').config();
const mysql = require('mysql2');

// Afficher les variables d'environnement pour vérification
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Créer une connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306 // Assure-toi que le port est correct
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.message);
        process.exit(1); // Arrête le processus si la connexion échoue
    } else {
        console.log('Connecté à la base de données MySQL.');
    }
});

module.exports = db;
