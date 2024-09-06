/*
** BOOUNCE PROJECT, 2024
** rbac-express
** File description:
** userRoutes.js
*/

// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour l'inscription des utilisateurs
router.post('/register', userController.register);
// Route pour la connexion des utilisateurs
router.post('/login', userController.login);
// Route pour afficher le profil de l'utilisateur connecté
router.get('/profile', authMiddleware.authenticate, userController.getProfile);
// Route pour afficher le profil d'un autre utilisateur (ADMIN uniquement)
router.get('/users/:id', authMiddleware.authenticate, authMiddleware.authorize('ADMIN'), userController.getUserById);
// Route pour mettre à jour le profil de l'utilisateur connecté
router.put('/profile', authMiddleware.authenticate, userController.updateProfile);
// Route pour supprimer le compte de l'utilisateur connecté
router.delete('/profile', authMiddleware.authenticate, userController.deleteAccount);
// Route pour supprimer un autre compte utilisateur (ADMIN uniquement)
router.delete('/users/:id', authMiddleware.authenticate, authMiddleware.authorize('ADMIN'), userController.deleteUser);
// Route pour lister tous les utilisateurs (ADMIN uniquement)
router.get('/users', authMiddleware.authenticate, authMiddleware.authorize('ADMIN'), userController.listUsers);

module.exports = router;