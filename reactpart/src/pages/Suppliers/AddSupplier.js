import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addSupplier, updateSupplier } from '../../services/api';
import './AddSupplier.css';
import { Link } from 'react-router-dom';

const AddSupplier = () => {
    const location = useLocation();
    const supplier = location.state;

    const [supplierFormData, setSupplierFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (supplier) {
            setSupplierFormData({
                name: supplier.name,
                email: supplier.email,
                phone: supplier.phone,
                address: supplier.address,
            });
        }
    }, [supplier]);

    const handleInputChange = (e) => {
        setSupplierFormData({
            ...supplierFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (supplier) {
                // Si un fournisseur existe, mettez à jour le fournisseur existant
                await updateSupplier(supplier._id, supplierFormData);
            } else {
                // Sinon, ajoutez un nouveau fournisseur
                await addSupplier(supplierFormData);
            }
            // Réinitialisez les données du formulaire après l'ajout/la mise à jour
            setSupplierFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
            });
            setError(null);
            // Redirigez l'utilisateur vers la page de liste des fournisseurs après l'ajout/la mise à jour
            navigate('/suppliers');
        } catch (error) {
            setError('Erreur lors de l\'ajout ou de la mise à jour du fournisseur');
            console.error('Erreur lors de l\'ajout ou de la mise à jour du fournisseur', error);
        }
    };

    return (
        <div className="add-supplier-form">
            <h2>{supplier ? 'Modifier le fournisseur' : 'Ajouter un nouveau fournisseur'}</h2>
            {error && <p className="error">{error}</p>} {/* Affiche l'erreur si présente */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom du fournisseur"
                    value={supplierFormData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={supplierFormData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Téléphone"
                    value={supplierFormData.phone}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={supplierFormData.address}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{supplier ? 'Modifier' : 'Ajouter'}</button>
            </form>
            <Link to="/suppliers" className="back-to-list-link">Retour à la liste</Link>
        </div>
    );
};

export default AddSupplier;
