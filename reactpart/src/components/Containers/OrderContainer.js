import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/api'; // Importez la fonction d'API pour obtenir les commandes
import OrderList from '../Presentation/OrderList'; // Importez le composant `OrderList`
import './Containers.css'; // Assurez-vous d'importer le fichier de styles

const OrderContainer = () => {
    const [orders, setOrders] = useState([]); // État pour stocker la liste des commandes
    const [loading, setLoading] = useState(true); // État pour gérer l'état de chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Fonction pour récupérer les commandes depuis l'API
    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de l\'obtention des commandes');
            setLoading(false);
        }
    };

    // Utilisation de l'effet pour récupérer les commandes lors du montage du composant
    useEffect(() => {
        fetchOrders();
    }, []);

    // Affichage de l'état de chargement, d'erreur ou de la liste des commandes
    return (
        <div className="container">
            <h2>Gestion des commandes</h2>
            {loading ? (
                <p>Chargement...</p> // Affiche un message de chargement
            ) : error ? (
                <p className="error">{error}</p> // Affiche un message d'erreur
            ) : (
                <OrderList orders={orders} />
                // Utilise `OrderList` pour afficher la liste des commandes
            )}
        </div>
    );
};

export default OrderContainer;
