const mysql = require('mysql2');

// Créer une connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,      // Utilisation de la variable d'environnement pour l'hôte de la base de données
    user: process.env.DB_USER,      // Utilisation de la variable d'environnement pour le nom d'utilisateur MySQL
    password: process.env.DB_PASSWORD, // Utilisation de la variable d'environnement pour le mot de passe MySQL
    database: process.env.DB_NAME   // Utilisation de la variable d'environnement pour le nom de la base de données
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        process.exit(1); // Arrête le processus si la connexion échoue
    } else {
        console.log('Connecté à la base de données MySQL.');
    }
});

module.exports = db;
