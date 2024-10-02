// controllers/productController.js

const productService = require('../services/productService');

// Obtenir la liste de tous les produits
const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'obtention des produits' });
    }
};

// Ajouter un nouveau produit
const addProduct = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const newProduct = await productService.createProduct({ name, price, description });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout du produit', error });
    }
};

// Mettre à jour un produit existant
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const updatedProduct = await productService.updateProduct(id, { name, price, description });
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du produit', error });
    }
};

// Supprimer un produit existant
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await productService.deleteProduct(id);
        if (deletedProduct) {
            res.json({ message: 'Produit supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Produit non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
    }
};

module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};
