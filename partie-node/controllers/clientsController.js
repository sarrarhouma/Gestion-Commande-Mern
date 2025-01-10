// controllers/clientsController.js

const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var refreshTokens={}


// Obtenir la liste de tous les clients
const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'obtention des clients' });
    }
};

// Ajouter un nouveau client
const addClient = async (req, res) => {
    const { name, email, phone, address, password } = req.body;
    try {
        const newClient = new Client({ name, email, phone, address, password });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du client :', error);
        res.status(400).json({ message: 'Erreur lors de l\'ajout du client', error });
    }
};

// Mettre à jour un client existant
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, password  } = req.body;
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            id,
            { name, email, phone, address },
            { new: true }
        );
        if (updatedClient) {
            res.json(updatedClient);
        } else {
            res.status(404).json({ message: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du client', error });
    }
};
// Fonction pour supprimer un client
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }
        res.json({ message: 'Client supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du client :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du client' });
    }
};
// Register client 
const registerClient = async (req, res) => {
    const { name, email, phone, address, password } = req.body;
    try {
        const newClient = new Client({ name, email, phone, address, password });
        await newClient.save();
        res.status(201).json({ message: 'Client enregistré avec succès', client: newClient });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'enregistrement du client', error });
    }
};
// login client
const loginClient = async (req, res) => {
    try {
        // Extraire les variables saisies (email et password) de la requête
        const { email, password } = req.body;

        // Vérifier si l'email ou le mot de passe est manquant
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Rechercher le client dans la base de données par email
        const client = await Client.findOne({ email });

        // Vérifier si le client existe
        if (!client) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        // Comparer les mots de passe
        const isPasswordValid = await bcrypt.compare(password, client.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Créer un jeton d'accès JWT
        const secretKey = process.env.JWT_SECRET; // Assurez-vous que `JWT_SECRET` est défini dans votre environnement
        const accessToken = jwt.sign({ id: client._id }, secretKey, { expiresIn: '1h' });

        // Répondre avec les informations de connexion
        res.status(200).json({
            message: 'Login successful',
            client: {
                id: client._id,
                email: client.email,
                name: client.name // Autres détails du client (si nécessaire)
            },
            accessToken
        });
    } catch (error) {
        // Gérer les erreurs et renvoyer un statut d'erreur
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
const genToken = (id) => {
    // Vérifiez que la clé secrète JWT_SECRET est définie
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('JWT_SECRET is not defined');
    }

    // Créez et renvoyez un jeton d'accès JWT
    return jwt.sign({ id }, secretKey, { expiresIn: '10d' });
};


module.exports = {
    getClients,
    addClient,
    updateClient,
    deleteClient,
    registerClient,
    loginClient,
    genToken,
};
