/*
** BOOUNCE PROJECT, 2024
** rbac-express
** File description:
** authMiddleware.js
*/

const jwt = require('jsonwebtoken');

// Middleware d'authentification
exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).send('Token manquant');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Erreur lors de la vérification du token:', err); // Ajoute un log pour voir l'erreur
            return res.status(401).send('Token invalide');
        }
        req.user = decoded;
        next();
    });
    
};

// Middleware d'autorisation
exports.authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).send('Accès interdit');
    }
    next();
};
