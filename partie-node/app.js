// app.js

// Importations
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();


// Importer les routes
const clientsRoutes = require('./routes/clients');
const ordersRoutes = require('./routes/orders');
const productsRoutes = require('./routes/products');
const suppliersRoutes = require('./routes/suppliers');

// Importer la connexion à la base de données
const connectDB = require('./config/db');

// Initialiser l'application Express
const app = express();

// Utiliser des middlewares
app.use(cors()); // Activer CORS
app.use(morgan('dev')); // Activer la journalisation des requêtes HTTP
app.use(helmet()); // Activer la sécurité des en-têtes HTTP
app.use(express.json()); // Permettre le traitement des requêtes JSON

// Connecter à la base de données
connectDB();

// Définir les routes de l'API
app.use('/api/clients', clientsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/suppliers', suppliersRoutes);

// Gestion des erreurs (404)
app.use((req, res) => {
    res.status(404).json({ message: 'Ressource non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Définir le port d'écoute et démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
