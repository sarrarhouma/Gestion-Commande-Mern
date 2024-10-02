import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Ajoutez l'importation de Link
import { addProduct, updateProduct } from '../../services/api'; // Importez les fonctions d'API
import './AddProduct.css'; // Importez le fichier de styles

const AddProduct = () => {
    const location = useLocation();
    const product = location.state;

    const [productFormData, setProductFormData] = useState({
        name: '',
        price: '',
        description: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setProductFormData({
                name: product.name,
                price: product.price,
                description: product.description,
            });
        }
    }, [product]);

    const handleInputChange = (e) => {
        setProductFormData({
            ...productFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product) {
                // Si un produit existe, mettez à jour le produit existant
                await updateProduct(product._id, productFormData);
            } else {
                // Sinon, ajoutez un nouveau produit
                await addProduct(productFormData);
            }
            // Réinitialisez les données du formulaire après l'ajout/la mise à jour
            setProductFormData({
                name: '',
                price: '',
                description: '',
            });
            setError(null);
            // Redirigez l'utilisateur vers la page de liste des produits après l'ajout/la mise à jour
            navigate('/products');
        } catch (error) {
            setError('Erreur lors de l\'ajout ou de la mise à jour du produit');
            console.error('Erreur lors de l\'ajout ou de la mise à jour du produit', error);
        }
    };

    return (
        <div className="add-product-form">
            <h2>{product ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h2>
            {error && <p className="error">{error}</p>} {/* Affiche l'erreur si présente */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom du produit"
                    value={productFormData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix"
                    value={productFormData.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={productFormData.description}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{product ? 'Modifier' : 'Ajouter'}</button>
            </form>
            {/* Ajoutez le lien de retour à la liste des produits */}
            <Link to="/products">Retour à la liste</Link>
        </div>
    );
};

export default AddProduct;
