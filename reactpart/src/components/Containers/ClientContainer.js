import React, { useEffect, useState } from 'react';
import { getClients } from '../../services/api'; // Importez la fonction d'API pour obtenir les clients
import ClientList from '../Presentation/ClientList'; // Importez le composant `ClientList`
import './Containers.css'; // Assurez-vous d'importer le fichier de styles

const ClientContainer = () => {
    const [clients, setClients] = useState([]); // État pour stocker la liste des clients
    const [loading, setLoading] = useState(true); // État pour gérer l'état de chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Fonction pour récupérer les clients depuis l'API
    const fetchClients = async () => {
        try {
            const response = await getClients();
            setClients(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de l\'obtention des clients');
            setLoading(false);
        }
    };

    // Utilisation de l'effet pour récupérer les clients lors du montage du composant
    useEffect(() => {
        fetchClients();
    }, []);

    // Affichage de l'état de chargement, d'erreur ou de la liste des clients
    return (
        <div className="container">
            <h2>Gestion des clients</h2>
            {loading ? (
                <p>Chargement...</p> // Affiche un message de chargement
            ) : error ? (
                <p className="error">{error}</p> // Affiche un message d'erreur
            ) : (
                <ClientList clients={clients} /> // Utilise `ClientList` pour afficher la liste des clients
            )}
        </div>
    );
};

export default ClientContainer;
