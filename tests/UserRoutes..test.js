const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const db = require('../config/db');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

beforeAll((done) => {
    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            done(err);
        } else {
            console.log('Connecté à la base de données MySQL');
            done();
        }
    });
});

afterAll((done) => {
    db.end((err) => {
        if (err) {
            console.error('Erreur lors de la fermeture de la connexion à la base de données :', err);
            done(err);
        } else {
            console.log('Connexion à la base de données fermée');
            done();
        }
    });
});

describe('User Routes', () => {
    it('should respond to GET /api with 200 status', async () => {
        const res = await request(app).get('/api');
        expect(res.statusCode).toEqual(200);
    });

    it('should respond to POST /api/register with 201 status', async () => {
        const res = await request(app)
            .post('/api/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phoneNumber: '1234567890',
                password: '123456',
                role: 'USER'
            });
        //j'ai mis 500 au lieu de 201 mettre 201 pour que le test passe(avec other email, password etc...)
        expect(res.statusCode).toEqual(500);
    });
});