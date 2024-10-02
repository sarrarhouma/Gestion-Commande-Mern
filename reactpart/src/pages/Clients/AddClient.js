import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Importez useLocation et Link
import { addClient, updateClient } from '../../services/api'; // Importez les fonctions d'API
import './AddClient.css'; // Importez le fichier de styles

const AddClient = () => {
    const location = useLocation();
    const client = location.state;

    const [clientFormData, setClientFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (client) {
            setClientFormData({
                name: client.name,
                email: client.email,
                phone: client.phone,
                address: client.address,
                password: client.password,
            });
        }
    }, [client]);

    const handleInputChange = (e) => {
        setClientFormData({
            ...clientFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (client) {
                // Si un client existe, mettez à jour le client existant
                await updateClient(client._id, clientFormData);
            } else {
                // Sinon, ajoutez un nouveau client
                await addClient(clientFormData);
            }
            // Réinitialisez les données du formulaire
            setClientFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                password: '',
            });
            setError(null);
            // Redirigez vers la page de liste des clients
            navigate('/clients');
        } catch (error) {
            setError('Erreur lors de l\'ajout ou de la mise à jour du client');
            console.error('Erreur lors de l\'ajout ou de la mise à jour du client', error);
        }
    };

    return (
        <div className="add-client-form">
            <h2>{client ? 'Modifier le client' : 'Ajouter un nouveau client'}</h2>
            {error && <p className="error">{error}</p>} {/* Affiche l'erreur si présente */}
          
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom du client"
                    value={clientFormData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={clientFormData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Téléphone"
                    value={clientFormData.phone}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={clientFormData.address}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={clientFormData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{client ? 'Modifier' : 'Ajouter'}</button>
            </form>
              {/* Ajoutez le lien "Retour à la liste" */}
              <Link to="/clients" className="back-to-list-link">Retour à la liste</Link>
        </div>
    );
};

export default AddClient;
