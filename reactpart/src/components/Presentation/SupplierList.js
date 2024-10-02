import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuppliers, deleteSupplier } from '../../services/api';
import './SupplierList.css';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await getSuppliers();
            setSuppliers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de l\'obtention des fournisseurs');
            setLoading(false);
        }
    };

    const handleAdd = () => {
        navigate('/addsupplier'); // Redirige vers la page d'ajout de fournisseur
    };

    const handleEdit = (supplier) => {
        navigate('/addsupplier', { state: supplier }); // Redirige vers la page d'édition de fournisseur avec les données du fournisseur
    };

    const handleDelete = async (supplierId) => {
        try {
            await deleteSupplier(supplierId);
            fetchSuppliers();
        } catch (err) {
            console.error(`Erreur lors de la suppression du fournisseur avec l'ID : ${supplierId}`, err);
        }
    };

    return (
        <div className="supplier-list">
            <h2>Liste des fournisseurs</h2>
            <button className="btn add-btn" onClick={handleAdd}>Ajouter Fournisseur</button>
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
                        {suppliers.map((supplier) => (
                            <tr key={supplier._id}>
                                <td>{supplier.name}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.phone}</td>
                                <td>{supplier.address}</td>
                                <td>
                                    <button className="btn edit-btn" onClick={() => handleEdit(supplier)}>Modifier</button>
                                    <button className="btn delete-btn" onClick={() => handleDelete(supplier._id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SupplierList;
