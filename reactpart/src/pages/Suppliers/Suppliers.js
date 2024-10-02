import React from 'react';
import SupplierContainer from '../../components/Containers/SupplierContainer'; // Importez `SupplierContainer` depuis les composants
import './Suppliers.css'; // Importez le fichier de styles

const Suppliers = () => {
    return (
        <div className="suppliers-page">
          
            {/* Utilisez `SupplierContainer` pour gérer et afficher les fournisseurs */}
            <SupplierContainer />
        </div>
    );
};

export default Suppliers;
