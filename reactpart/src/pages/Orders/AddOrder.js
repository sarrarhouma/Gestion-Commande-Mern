import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Importez `Link`
import { addOrder, updateOrder } from '../../services/api'; // Importez les fonctions d'API
import './AddOrder.css'; // Importez le fichier de styles

const AddOrder = () => {
    const location = useLocation();
    const order = location.state;

    const [orderFormData, setOrderFormData] = useState({
        clientId: '',
        clientName: '',
        clientPhone: '',
        clientAddress: '',
        productId: '',
        productName: '',
         quantity: '',
        price: '',
        total: '',
        status: 'pending',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (order) {
            setOrderFormData({
                clientId: order.client._id,
                clientName: order.client.name,
                clientPhone: order.client.phone,
                clientAddress: order.client.address,
                productId: order.products[0]._id,
                productName: order.products[0].name,
                quantity: order.products[0].quantity,
                price: order.products[0].price,
                total: order.total,
                status: order.status,
            });
        }
    }, [order]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderFormData({
            ...orderFormData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (order) {
                await updateOrder(order._id, orderFormData);
            } else {
                await addOrder(orderFormData);
            }
            resetFormData();
            navigate('/orders'); // Redirige vers la liste des commandes
        } catch (error) {
            setError('Erreur lors de l\'ajout ou de la mise à jour de la commande');
            console.error('Erreur lors de l\'ajout ou de la mise à jour de la commande', error);
        }
    };

    const resetFormData = () => {
        setOrderFormData({
            clientId: '',
            clientName: '',
            clientPhone: '',
            clientAddress: '',
            productId: '',
            productName: '',
            quantity: '',
            price: '',
            total: '',
            status: 'pending',
        });
    };

    return (
        <div className="add-order-form">
            <h2>{order ? 'Modifier la commande' : 'Ajouter une commande'}</h2>
            {error && <p className="error">{error}</p>} {/* Affiche l'erreur si présente */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="clientName"
                    placeholder="Nom client"
                    value={orderFormData.clientName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="tel"
                    name="clientPhone"
                    placeholder="Téléphone client"
                    value={orderFormData.clientPhone}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="clientAddress"
                    placeholder="Adresse client"
                    value={orderFormData.clientAddress}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="productId"
                    placeholder="ID produit"
                    value={orderFormData.productId}
                    onChange={handleInputChange}
                    required
                />
              <input
                    type="text"
                    name="productName"
                    placeholder="Nom produit"
                    value={orderFormData.productName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantité"
                    value={orderFormData.quantity}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix"
                    value={orderFormData.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="total"
                    placeholder="Total"
                    value={orderFormData.total}
                    onChange={handleInputChange}
                    required
                />
                <select name="status" value={orderFormData.status} onChange={handleInputChange} required>
                    <option value="pending">En attente</option>
                    <option value="completed">Complétée</option>
                    <option value="cancelled">Annulée</option>
                </select>
                <button type="submit">{order ? 'Mettre à jour' : 'Ajouter'}</button>
                {/* Lien pour retourner à la liste des commandes */}
                <Link to="/orders" className="back-to-list-link">Retour à la liste</Link>
            </form>
        </div>
    );
};

export default AddOrder;
