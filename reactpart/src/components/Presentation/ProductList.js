import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/api'; // Importez les fonctions d'API
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getProducts();
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors de l\'obtention des produits');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAdd = () => {
        navigate('/addproduct'); // Redirige vers la page d'ajout de produit
    };

    const handleEdit = (product) => {
        navigate('/addproduct', { state: product }); // Redirige vers la page de modification de produit avec les données du produit
    };

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter(product => product._id !== productId));
        } catch (err) {
            setError(`Erreur lors de la suppression du produit avec l'ID : ${productId}`);
        }
    };

    return (
        <div className="product-list">
            <h2>Liste des produits</h2>
            <button className="btn add-btn" onClick={handleAdd}>Ajouter Produit</button>
            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price} DT</td>
                                <td>{product.description}</td>
                                <td>
                                    <button className="btn edit-btn" onClick={() => handleEdit(product)}>Modifier</button>
                                    <button className="btn delete-btn" onClick={() => handleDelete(product._id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
