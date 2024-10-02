// services/suppliersService.js

const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

// Créer un nouveau fournisseur
const createSupplier = async (supplierData) => {
    const { name, email, phone, address, products } = supplierData;

    // Vérifier si les produits existent
    if (products && products.length > 0) {
        const productIds = products.map((product) => product._id);
        const foundProducts = await Product.find({ _id: { $in: productIds } });

        if (foundProducts.length !== products.length) {
            throw new Error('Certains produits ne sont pas disponibles');
        }
    }

    // Créer le fournisseur
    const newSupplier = new Supplier({ name, email, phone, address, products });
    await newSupplier.save();

    return newSupplier;
};

// Mettre à jour un fournisseur
const updateSupplier = async (id, updateData) => {
    const { name, email, phone, address, products } = updateData;

    // Rechercher le fournisseur
    const supplier = await Supplier.findById(id);
    if (!supplier) {
        throw new Error('Fournisseur non trouvé');
    }

    // Mettre à jour les informations du fournisseur
    if (name) supplier.name = name;
    if (email) supplier.email = email;
    if (phone) supplier.phone = phone;
    if (address) supplier.address = address;

    // Mettre à jour les produits du fournisseur
    if (products && products.length > 0) {
        const productIds = products.map((product) => product._id);
        const foundProducts = await Product.find({ _id: { $in: productIds } });

        if (foundProducts.length !== products.length) {
            throw new Error('Certains produits ne sont pas disponibles');
        }

        supplier.products = products;
    }

    await supplier.save();
    return supplier;
};

// Supprimer un fournisseur
const deleteSupplier = async (id) => {
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
        throw new Error('Fournisseur non trouvé');
    }
    return supplier;
};

module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
};
