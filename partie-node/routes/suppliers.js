// routes/suppliers.js

const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliersController');

// Obtenir la liste de tous les fournisseurs
router.get('/', suppliersController.getSuppliers);

// Ajouter un nouveau fournisseur
router.post('/', suppliersController.addSupplier);

// Mettre à jour un fournisseur existant
router.put('/:id', suppliersController.updateSupplier);

// Supprimer un fournisseur existant
router.delete('/:id', suppliersController.deleteSupplier);

module.exports = router;
