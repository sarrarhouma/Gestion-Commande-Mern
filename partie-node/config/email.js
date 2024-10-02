// config/email.js

const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true', // Utilisation du SSL/TLS si défini à 'true'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Vérification de la configuration du transporteur d'email
transporter.verify((error, success) => {
    if (error) {
        console.error('Erreur lors de la configuration du transporteur d\'email :', error);
    } else {
        console.log('Transporteur d\'email configuré avec succès');
    }
});

module.exports = transporter;
