// utils/emailTemplate.js

// Générer un modèle d'email pour une demande de prix
const priceRequestText = (productDetails) => {
    let text = 'Bonjour,\n\n';
    text += 'Nous vous contactons pour obtenir des informations sur les prix des produits suivants :\n\n';
    
    productDetails.forEach((product, index) => {
        text += `${index + 1}. Nom du produit : ${product.name}\n`;
        text += `   Quantité demandée : ${product.quantity}\n\n`;
    });
    
    text += 'Veuillez nous faire parvenir vos meilleurs prix dès que possible.\n\n';
    text += 'Cordialement,\nVotre entreprise';

    return text;
};

// Générer un modèle HTML pour une demande de prix
const priceRequestHtml = (productDetails) => {
    let html = '<p>Bonjour,</p>';
    html += '<p>Nous vous contactons pour obtenir des informations sur les prix des produits suivants :</p>';
    html += '<ul>';
    
    productDetails.forEach((product, index) => {
        html += `<li>${index + 1}. Nom du produit : ${product.name}<br>`;
        html += `Quantité demandée : ${product.quantity}</li>`;
    });
    
    html += '</ul>';
    html += '<p>Veuillez nous faire parvenir vos meilleurs prix dès que possible.</p>';
    html += '<p>Cordialement,<br>Votre entreprise</p>';

    return html;
};

// Exporter les fonctions
module.exports = {
    priceRequestText,
    priceRequestHtml,
};
