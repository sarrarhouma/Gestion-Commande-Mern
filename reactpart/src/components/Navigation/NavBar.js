import React from 'react';
import { Link } from 'react-router-dom'; // Importez `Link` depuis `react-router-dom`
import './Navigation.css'; // Assurez-vous d'importer le fichier de styles

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/home">Gestion des Commandes et Achats</Link> {/* Nom ou logo de l'application */}
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link to="/clients">Clients</Link>
                </li>
              
                <li className="navbar-item">
                    <Link to="/products">Produits</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/suppliers">Fournisseurs</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/orders">Commandes</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/"> Déconnexion </Link>
                </li>
                {/* Ajoutez d'autres liens de navigation ici si nécessaire */}
            </ul>
        </nav>
    );
};

export default NavBar;
