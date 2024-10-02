import React from 'react';
import { Link } from 'react-router-dom'; // Utilisez `Link` pour permettre la navigation
import './Error.css'; // Importez le fichier de styles

const NotFound = () => {
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <p>Page non trouvée</p>
            <Link to="/" className="back-link">Retour à la page d'accueil</Link>
        </div>
    );
};

export default NotFound;
