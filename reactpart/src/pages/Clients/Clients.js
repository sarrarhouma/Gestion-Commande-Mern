import React from 'react';
import ClientContainer from '../../components/Containers/ClientContainer'; // Importez `ClientContainer` depuis les composants
import './Clients.css'; // Importez le fichier de styles

const Clients = () => {
    return (
        <div className="clients-page">
            
            {/* Utilisez `ClientContainer` pour gérer et afficher les clients */}
            <ClientContainer />
        </div>
    );
};

export default Clients;
