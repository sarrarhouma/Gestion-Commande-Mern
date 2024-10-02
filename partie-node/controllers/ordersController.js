// controllers/ordersController.js

const Order = require('../models/Order');

// Obtenir la liste de toutes les commandes
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('client').populate('products.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'obtention des commandes' });
    }
};

// Ajouter une nouvelle commande
const addOrder = async (req, res) => {
    const { client, products } = req.body;
    try {
        const newOrder = new Order({
            client,
            products,
            total: products.reduce((total, product) => total + (product.quantity * product.price), 0),
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout de la commande', error });
    }
};

// Mettre à jour une commande existante
/*const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { client, products, status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { client, products, total: products.reduce((total, product) => total + (product.quantity * product.price), 0), status },
            { new: true }
        ).populate('client').populate('products.productId');
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la commande', error });
    }
};*/
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { client, products, status } = req.body;

    // Vérification de products
    if (!Array.isArray(products)) {
        return res.status(400).json({ message: 'Les produits doivent être un tableau' });
    }

    try {
        // Calculer le total de la commande
        const total = products.reduce((total, product) => total + (product.quantity * product.price), 0);

        // Mettre à jour la commande
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { client, products, total, status },
            { new: true }
        ).populate('client').populate('products.productId');

        // Vérifier si la commande a été trouvée et mise à jour
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de la commande avec l'ID : ${id}`, error);
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la commande', error: error.message });
    }
};



// Supprimer une commande existante
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findOneAndDelete({ _id: id });
        if (deletedOrder) {
            res.json({ message: 'Commande supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        console.error(`Erreur lors de la suppression de la commande avec l'ID : ${id}`, error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande' });
    }
};



module.exports = {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
};
