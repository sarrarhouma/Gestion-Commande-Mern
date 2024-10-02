import React from 'react';
import { Link } from 'react-router-dom'; // Importez `Link` depuis `react-router-dom`
import './Navigation.css'; // Assurez-vous d'importer le fichier de styles

const SideMenu = ({ isOpen, onClose }) => {
    return (
        <div className={`side-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={onClose}>×</button> {/* Bouton de fermeture */}
            <ul className="side-menu-list">
                <li className="side-menu-item">
                    <Link to="/clients" onClick={onClose}>Clients</Link>
                </li>
                <li className="side-menu-item">
                    <Link to="/orders" onClick={onClose}>Commandes</Link>
                </li>
                <li className="side-menu-item">
                    <Link to="/products" onClick={onClose}>Produits</Link>
                </li>
                <li className="side-menu-item">
                    <Link to="/suppliers" onClick={onClose}>Fournisseurs</Link>
                </li>
                <li className="side-menu-item">
                    <Link to="/login" onClick={onClose}>Se connecter</Link>
                </li>
                {/* Ajoutez d'autres liens de navigation ici si nécessaire */}
            </ul>
        </div>
    );
};

export default SideMenu;
