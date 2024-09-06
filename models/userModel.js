// models/userModel.js

const db = require('../config/db'); // Importer la connexion à la base de données

// Fonction pour créer une table utilisateurs
const createTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone_number VARCHAR(15),
            password VARCHAR(255) NOT NULL,
            account_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            account_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            role ENUM('ADMIN', 'BLOGGER', 'USER') DEFAULT 'USER',
            profile_picture VARCHAR(255)
        );
    `;
    
    db.query(query, (err) => {
        if (err) {
            console.error('Erreur lors de la création de la table des utilisateurs :', err);
        } else {
            console.log('Table des utilisateurs créée ou déjà existante.');
        }
    });
};
createTable();
module.exports = {
    createTable
};
