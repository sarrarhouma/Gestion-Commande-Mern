import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, deleteOrder } from '../../services/api';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

    // Fonction pour charger les commandes depuis l'API
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrders();
            setOrders(response.data);
            setFilteredOrders(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Erreur lors de l\'obtention des commandes :', err);
            setError('Erreur lors de l\'obtention des commandes');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fonction pour gérer la suppression d'une commande
    const handleDelete = async (orderId) => {
        console.log(`Tentative de suppression de la commande avec l'ID : ${orderId}`);
        try {
            await deleteOrder(orderId);
            setOrders(orders.filter(order => order._id !== orderId));
            setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
            console.log(`Commande avec l'ID : ${orderId} supprimée avec succès`);
        } catch (err) {
            console.error(`Erreur lors de la suppression de la commande avec l'ID : ${orderId}`, err);
            setError(`Erreur lors de la suppression de la commande avec l'ID : ${orderId}`);
        }
    };

    // Fonction pour rediriger vers la page d'ajout d'une nouvelle commande
    const handleAdd = () => {
        navigate('/addorder'); // Redirige vers la page d'ajout de commande
    };

    // Fonction pour rediriger vers la page de modification d'une commande existante
    const handleEdit = (order) => {
        navigate('/addorder', { state: order });
    };

    // Fonction pour gérer la recherche par ID
    const handleSearch = (e) => {
        setSearchId(e.target.value);
        if (e.target.value) {
            const filtered = orders.filter(order => order._id === e.target.value);
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    };

    return (
        <div className="orders-list">
            <h2>Liste des commandes</h2>
            <button className="btn add-btn" onClick={handleAdd}>Ajouter Commande</button>

            {/* Barre de recherche par ID */}
            <input
                type="text"
                className="search-bar"
                placeholder="Chercher Commande"
                value={searchId}
                onChange={handleSearch}
            />

            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <div className="orders-grid">
                    {filteredOrders.map(order => (
                        <div key={order._id} className="order-card">
                            <h3>Commande de : {order.client && order.client.name ? order.client.name : 'Inconnu'}</h3>
                            <p>Téléphone client : {order.client && order.client.phone ? order.client.phone : 'Inconnu'}</p>
                            <p>Adresse client : {order.client && order.client.address ? order.client.address : 'Inconnu'}</p>
                            <p>Total : {order.total} DT</p>

                            {/* Afficher les produits commandés */}
                            <p>Produits commandés :</p>
                            <ul>
                                {order.products.map(product => (
                                    <li key={product._id}>
                                        Nom du produit : {product.productId.name} <br></br>
                                        Prix du produit : {product.productId.price} DT<br></br>
                                        Quantité : {product.quantity}
                                    </li>
                                ))}
                            </ul>
                          
                            <div className="actions">
                                <button className="btn delete-btn" style={{ backgroundColor: 'red' }} onClick={() => handleDelete(order._id)}>Supprimer</button>
                                <button className="btn edit-btn" style={{ backgroundColor: 'green' }} onClick={() => handleEdit(order)}>Modifier</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
