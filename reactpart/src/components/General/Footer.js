import React from 'react';
import './General.css'; // Importez le fichier de styles

const Footer = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} MonApplication. Tous droits réservés.</p>
            {/* Ajoutez d'autres éléments de pied de page si nécessaire */}
        </footer>
    );
};

export default Footer;
