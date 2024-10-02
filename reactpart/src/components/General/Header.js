import React from 'react';
import { Link } from 'react-router-dom';
import './General.css'; // Importez le fichier de styles

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">MonApplication</Link> {/* Nom ou logo de l'application */}
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/clients">Clients</Link></li>
                    <li><Link to="/orders">Commandes</Link></li>
                    <li><Link to="/products">Produits</Link></li>
                    <li><Link to="/suppliers">Fournisseurs</Link></li>
                    <li><Link to="/login">Se connecter</Link></li>
                    {/* Ajoutez d'autres liens de navigation si nécessaire */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
