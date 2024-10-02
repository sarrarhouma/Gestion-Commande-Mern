// services/ordersService.js

const Order = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');

// Créer une nouvelle commande
const createOrder = async (orderData) => {
    const { client, products } = orderData;

    // Vérifier si le client existe
    const clientExists = await Client.findById(client);
    if (!clientExists) {
        throw new Error('Client non trouvé');
    }

    // Vérifier les produits
    const productIds = products.map((product) => product.productId);
    const foundProducts = await Product.find({ _id: { $in: productIds } });
    if (foundProducts.length !== products.length) {
        throw new Error('Certains produits ne sont pas disponibles');
    }

    // Calculer le total
    const total = products.reduce((acc, product) => {
        const foundProduct = foundProducts.find((p) => p._id.toString() === product.productId);
        return acc + (product.quantity * foundProduct.price);
    }, 0);

    // Créer la commande
    const newOrder = new Order({ client, products, total });
    await newOrder.save();

    return newOrder;
};

// Mettre à jour une commande
const updateOrder = async (id, updateData) => {
    const { client, products, status } = updateData;

    // Rechercher la commande
    const order = await Order.findById(id);
    if (!order) {
        throw new Error('Commande non trouvée');
    }

    // Mettre à jour les informations de la commande
    if (client) {
        const clientExists = await Client.findById(client);
        if (!clientExists) {
            throw new Error('Client non trouvé');
        }
        order.client = client;
    }

    if (products) {
        const productIds = products.map((product) => product.productId);
        const foundProducts = await Product.find({ _id: { $in: productIds } });

        if (foundProducts.length !== products.length) {
            throw new Error('Certains produits ne sont pas disponibles');
        }

        // Calculer le nouveau total
        order.total = products.reduce((acc, product) => {
            const foundProduct = foundProducts.find((p) => p._id.toString() === product.productId);
            return acc + (product.quantity * foundProduct.price);
        }, 0);

        order.products = products;
    }

    if (status) {
        order.status = status;
    }

    await order.save();
    return order;
};

// Supprimer une commande
const deleteOrder = async (id) => {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
        throw new Error('Commande non trouvée');
    }
    return order;
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
};
