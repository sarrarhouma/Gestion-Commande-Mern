// routes/clients.js

const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

// Obtenir la liste de tous les clients
router.get('/', clientsController.getClients);

// Ajouter un nouveau client
router.post('/', clientsController.addClient);

// Mettre à jour un client existant
router.put('/:id', clientsController.updateClient);

// Supprimer un client existant
router.delete('/:id', clientsController.deleteClient);

// Route pour enregistrer un nouveau client
router.post('/register', clientsController.registerClient);

// Route pour connecter un client
router.post('/login', clientsController.loginClient);

module.exports = router;
