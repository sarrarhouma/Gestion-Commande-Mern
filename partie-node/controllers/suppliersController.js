// controllers/suppliersController.js

const Supplier = require('../models/Supplier');
const suppliersService = require('../services/suppliersService');


// Obtenir la liste de tous les fournisseurs
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'obtention des fournisseurs' });
    }
};

// Ajouter un nouveau fournisseur
const addSupplier = async (req, res) => {
    const { name, email, phone, address, products } = req.body;
    try {
        const newSupplier = new Supplier({ name, email, phone, address, products });
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout du fournisseur', error });
    }
};

// Mettre à jour un fournisseur existant
const updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, products } = req.body;
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            { name, email, phone, address, products },
            { new: true }
        );
        if (updatedSupplier) {
            res.json(updatedSupplier);
        } else {
            res.status(404).json({ message: 'Fournisseur non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du fournisseur', error });
    }
};

// Supprimer un fournisseur existant
/*const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await suppliersService.deleteSupplier(id);
        if (deletedSupplier) {
            res.json({ message: 'Fournisseur supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Fournisseur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du fournisseur' });
    }
};
*/
const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await suppliersService.deleteSupplier(id);
        if (deletedSupplier) {
            // Le fournisseur a été supprimé avec succès
            res.json({ message: 'Fournisseur supprimé avec succès' });
        } else {
            // Le fournisseur n'a pas été trouvé
            res.status(404).json({ message: 'Fournisseur non trouvé' });
        }
    } catch (error) {
        // Enregistre l'erreur pour le débogage
        console.error('Erreur lors de la suppression du fournisseur :', error);
        
        // Répond avec un message d'erreur spécifique
        res.status(500).json({ message: 'Erreur lors de la suppression du fournisseur' });
    }
};


module.exports = {
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
};
