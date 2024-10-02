// services/emailService.js

const transporter = require('../config/email');
const emailTemplates = require('../utils/emailTemplate');

// Envoyer un email avec le transporteur configuré
const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, // Utilisez une adresse email par défaut ou définie dans les variables d'environnement
        to,
        subject,
        text,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email envoyé à ${to} avec succès`);
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email à ${to} : ${error.message}`);
        throw error;
    }
};

// Envoyer un email de demande de prix aux fournisseurs
const sendPriceRequestEmail = async (supplierEmail, productDetails) => {
    const subject = 'Demande de prix pour produits';
    const text = emailTemplates.priceRequestText(productDetails);
    const html = emailTemplates.priceRequestHtml(productDetails);

    await sendEmail(supplierEmail, subject, text, html);
};

module.exports = {
    sendEmail,
    sendPriceRequestEmail,
};
