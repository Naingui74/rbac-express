/*
** BOOUNCE PROJECT, 2024
** rbac-express
** File description:
** index.js
*/

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const swaggerSetup = require('./swagger');
const userRoutes = require('./routes/userRoutes');
const { createTable } = require('./models/userModel'); // Importer la fonction createTable

const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
});

db.connect((err) => {
    if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
    }
    console.log('Connecté à la base de données MySQL');
    // Créer la table des utilisateurs si elle n'existe pas
    createTable();
});

// Rendre la connexion à la base de données accessible dans les controleurs
app.use((req, res, next) => {
    req.db = db;
    next();
});

swaggerSetup(app);

// Utiliser les routes définies dans userRoutes.js
app.use('/api', userRoutes);

// Demarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});


//By Naingui74 RBAC-EXPRESS-APP
//This Project take me 2 days to complete it
//I have learned a lot of things about RBAC and how to implement it in a Node.js application
//I have learned how to use JWT for authentication and authorization
//I have learned how to use MySQL for the database
//I have learned how to use Express.js for the server
//I have learned how to use bcrypt for password hashing
//I have learned how to use dotenv for environment variables
//I have learned how to use mysql2 for MySQL connection
//I have learned how to use body-parser for parsing request bodies
//I have learned how to use Postman for testing APIs
//I have learned how to use VSCode for coding
//I have learned how to use GitHub for version control
//I have learned how to use Markdown for writing documentation
//I have learned how to use Google for searching solutions
//I have learned how to use Stack Overflow for asking questions
//I have learned how to use YouTube for watching tutorials
//I have learned how to use Udemy for learning new skills