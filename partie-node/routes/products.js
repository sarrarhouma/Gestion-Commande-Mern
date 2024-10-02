// routes/products.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtenir la liste de tous les produits
router.get('/', productController.getProducts);

// Ajouter un nouveau produit
router.post('/', productController.addProduct);

// Mettre à jour un produit existant
router.put('/:id', productController.updateProduct);

// Supprimer un produit existant
router.delete('/:id', productController.deleteProduct);

module.exports = router;
