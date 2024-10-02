import React, { useEffect, useState } from 'react';
import { getSuppliers } from '../../services/api'; // Importez la fonction d'API pour obtenir les fournisseurs
import SupplierList from '../Presentation/SupplierList'; // Importez le composant `SupplierList`
import './Containers.css'; // Importez le fichier de styles

const SupplierContainer = () => {
    const [suppliers, setSuppliers] = useState([]); // État pour stocker la liste des fournisseurs
    const [loading, setLoading] = useState(true); // État pour gérer l'état de chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Fonction pour récupérer les fournisseurs depuis l'API
    const fetchSuppliers = async () => {
        try {
            const response = await getSuppliers();
            setSuppliers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de l\'obtention des fournisseurs');
            setLoading(false);
        }
    };

    // Utilisation de l'effet pour récupérer les fournisseurs lors du montage du composant
    useEffect(() => {
        fetchSuppliers();
    }, []);

    // Affichage de l'état de chargement, d'erreur ou de la liste des fournisseurs
    return (
        <div className="container">
            <h2>Gestion des fournisseurs</h2>
            {loading ? (
                <p>Chargement...</p> // Affiche un message de chargement
            ) : error ? (
                <p className="error">{error}</p> // Affiche un message d'erreur
            ) : (
                <SupplierList suppliers={suppliers} /> // Utilise `SupplierList` pour afficher la liste des fournisseurs
            )}
        </div>
    );
};

export default SupplierContainer;
