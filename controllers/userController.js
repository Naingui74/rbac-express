/*
** BOOUNCE PROJECT, 2024
** rbac-express
** File description:
** userController.js
*/

const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//statuscode
//200: OK
//201: Created
//400: Bad Request
//401: Unauthorized
//403: Forbidden
//404: Not Found
//405: Method Not Allowed
//409: Conflict
//500: Internal Server Error


// Inscription des utilisateurs
exports.register = (req, res) => {
    const { firstName, lastName, email, phoneNumber, password, role } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !role) {
        return res.status(400).send('Tous les champs sont requis.');
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Erreur lors du hachage du mot de passe:', err);
            return res.status(500).send('Erreur lors du hachage du mot de passe');
        }

        const query = 'INSERT INTO users (first_name, last_name, email, phone_number, password, role) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [firstName, lastName, email, phoneNumber, hashedPassword, role], (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'inscription de l\'utilisateur:', err.message);
                return res.status(500).send('Erreur lors de l\'inscription de l\'utilisateur');
            }
            res.status(201).send('Utilisateur inscrit avec succès');
        });
    });
};

// Connexion des utilisateurs
exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log('Tentative de connexion avec email:', email);

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête SQL:', err);
            return res.status(500).send('Erreur lors de la connexion');
        }
        if (results.length === 0) {
            console.log('Aucun utilisateur trouvé avec cet email');
            return res.status(401).send('Email ou mot de passe incorrect');
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erreur lors de la vérification du mot de passe:', err);
                return res.status(500).send('Erreur lors de la vérification du mot de passe');
            }
            if (!isMatch) {
                console.log('Mot de passe incorrect');
                return res.status(401).send('Email ou mot de passe incorrect');
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};

// Afficher le profil de l'utilisateur connecté
exports.getProfile = (req, res) => {
    const userId = req.user.id;

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération du profil');
        }
        if (results.length === 0) {
            return res.status(404).send('Profil non trouvé');
        }
        res.json(results[0]);
    });
};

// Afficher le profil d'un utilisateur spécifique
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération du profil');
        }
        if (results.length === 0) {
            return res.status(404).send('Profil non trouvé');
        }
        res.json(results[0]);
    });
};

// Mettre à jour le profil de l'utilisateur connecté
exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { firstName, lastName, phoneNumber } = req.body;

    const query = 'UPDATE users SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?';
    db.query(query, [firstName, lastName, phoneNumber, userId], (err, results) => {
        if (err) {
            return res.status(500).send('Erreur lors de la mise à jour du profil');
        }
        res.send('Profil mis à jour avec succès');
    });
};

// Supprimer le compte de l'utilisateur connecté
exports.deleteAccount = (req, res) => {
    const userId = req.user.id;

    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Erreur lors de la suppression du compte');
        }
        res.send('Compte supprimé avec succès');
    });
};

// Supprimer un compte utilisateur spécifique
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Erreur lors de la suppression du compte');
        }
        res.send('Compte supprimé avec succès');
    });
};

// Lister tous les utilisateurs
exports.listUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération de la liste des utilisateurs');
        }
        res.json(results);
    });
};
