import React from 'react';
import { Link } from 'react-router-dom'; // Utilisez `Link` pour la navigation
import './Home.css'; // Importez le fichier de styles

const Home = () => {
    return (
        <div className="home-page">
            <h1>Bienvenue sur cette  Application de Gestion </h1>
            <p> Gestion des Commandes et Achats.</p>
            <div className="links">
                <Link to="/clients" className="home-link">Gérer les clients</Link>
               
                <Link to="/products" className="home-link">Gérer les produits</Link>
                <Link to="/suppliers" className="home-link">Gérer les fournisseurs</Link>
                <Link to="/orders" className="home-link">Gérer les commandes</Link>
            </div>
        </div>
    );
};

export default Home;
