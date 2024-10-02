import React, { useEffect, useState } from 'react';
import { getClients,  deleteClient } from '../../services/api';
import './ClientList.css';
import { useNavigate } from 'react-router-dom';




const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  ///  const [isEditing, setIsEditing] = useState(false);
   /// const [editingClientId, setEditingClientId] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchClients();
    }, []);
    
    const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await getClients();
            setClients(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de l\'obtention des clients');
            setLoading(false);
        }
    };

  /*  const handleAdd = () => {
        // Cette fonction peut ouvrir un formulaire pour ajouter un nouveau client.
        // Il peut être dans un composant modal ou dans un autre composant que vous allez utiliser pour afficher l'ajout de client.
    };
*/
        const handleAdd = () => {
            navigate('/addclient'); // Redirige vers la page d'ajout de client
        };
       /* const handleEdit = (client) => {
        setIsEditing(true);
        setEditingClientId(client._id);
        // Initialisez les valeurs du formulaire avec les valeurs du client existant
    };*/

    const handleEdit = (client) => {
        // Redirige vers la page d'ajout avec les données du client à modifier
        navigate('/addclient', { state: client });
    };
    
    

    const handleDelete = async (clientId) => {
        try {
            await deleteClient(clientId);
            fetchClients(); // Actualisez la liste des clients après la suppression
        } catch (err) {
            setError(`Erreur lors de la suppression du client avec l'ID : ${clientId}`);
        }
    };

    return (
        <div className="client-list">
            <h2>Liste des clients</h2>
            <button className="btn add-btn" onClick={handleAdd}>Ajouter Client</button>
            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Adresse</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client._id}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td>
                                    <button className="btn edit-btn" onClick={() => handleEdit(client)}>Modifier</button>
                                    <button className="btn delete-btn" onClick={() => handleDelete(client._id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClientList;
