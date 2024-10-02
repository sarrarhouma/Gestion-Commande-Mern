import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api'; // Importez la fonction d'API pour obtenir les produits
import ProductList from '../Presentation/ProductList'; // Importez le composant `ProductList`
import './Containers.css'; // Importez le fichier de styles

const ProductContainer = () => {
    const [products, setProducts] = useState([]); // État pour stocker la liste des produits
    const [loading, setLoading] = useState(true); // État pour gérer l'état de chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Fonction pour récupérer les produits depuis l'API
    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de l\'obtention des produits');
            setLoading(false);
        }
    };

    // Utilisation de l'effet pour récupérer les produits lors du montage du composant
    useEffect(() => {
        fetchProducts();
    }, []);

    // Affichage de l'état de chargement, d'erreur ou de la liste des produits
    return (
        <div className="container">
            <h2>Gestion des produits</h2>
            {loading ? (
                <p>Chargement...</p> // Affiche un message de chargement
            ) : error ? (
                <p className="error">{error}</p> // Affiche un message d'erreur
            ) : (
                <ProductList products={products} /> // Utilise `ProductList` pour afficher la liste des produits
            )}
        </div>
    );
};

export default ProductContainer;
