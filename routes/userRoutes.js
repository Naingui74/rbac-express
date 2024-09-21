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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Vérifier que l'API fonctionne
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: L'API fonctionne
 */
router.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working' });
});

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Échec de l'authentification
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Afficher le profil de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur
 *       401:
 *         description: Non autorisé
 */
router.get('/profile', authMiddleware.authenticate, userController.getProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Afficher le profil d'un autre utilisateur (ADMIN uniquement)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/users/:id', authMiddleware.authenticate, authMiddleware.authorize('ADMIN'), userController.getUserById);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Mettre à jour le profil de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil mis à jour
 *       401:
 *         description: Non autorisé
 */
router.put('/profile', authMiddleware.authenticate, userController.updateProfile);

/**
 * @swagger
 * /api/profile:
 *   delete:
 *     summary: Supprimer le compte de l'utilisateur connecté
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Compte supprimé avec succès
 *       401:
 *         description: Non autorisé
 */
router.delete('/profile', authMiddleware.authenticate, userController.deleteAccount);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un autre compte utilisateur (ADMIN uniquement)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Compte supprimé avec succès
 *       403:
 *         description: Accès interdit
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/users/:id', authMiddleware.authenticate, authMiddleware.authorize('ADMIN'), userController.deleteUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lister tous les utilisateurs (ADMIN uniquement)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       403:
 *         description: Accès interdit
 */
router.get('/users', authMiddleware.authenticate, authMiddleware.authorize('ADMIN'), userController.listUsers);

module.exports = router;
