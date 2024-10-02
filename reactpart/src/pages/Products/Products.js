import React from 'react';
import ProductContainer from '../../components/Containers/ProductContainer'; // Importez `ProductContainer` depuis les composants
import './Products.css'; // Importez le fichier de styles

const Products = () => {
    return (
        <div className="products-page">
         
            {/* Utilisez `ProductContainer` pour gérer et afficher les produits */}
            <ProductContainer />
        </div>
    );
};

export default Products;
