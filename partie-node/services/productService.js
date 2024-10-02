// services/productService.js

const Product = require('../models/Product');

// Obtenir la liste de tous les produits
const getAllProducts = async () => {
    return await Product.find();
};

// Créer un nouveau produit
const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
};

// Mettre à jour un produit existant
const updateProduct = async (id, updateData) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    return updatedProduct;
};

// Supprimer un produit existant
const deleteProduct = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
