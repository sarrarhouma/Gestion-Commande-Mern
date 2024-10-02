// routes/orders.js

const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// Obtenir la liste de toutes les commandes
router.get('/', ordersController.getOrders);

// Ajouter une nouvelle commande
router.post('/', ordersController.addOrder);

// Mettre à jour une commande existante
router.put('/:id', ordersController.updateOrder);

// Supprimer une commande existante
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
