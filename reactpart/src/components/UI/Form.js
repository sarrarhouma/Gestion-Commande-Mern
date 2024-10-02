import React from 'react';
import PropTypes from 'prop-types';
import './UI.css'; // Assurez-vous d'importer le fichier de styles

const Form = ({ onSubmit, children, className = '' }) => {
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`form ${className}`}>
            {children}
        </form>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired, // Fonction à appeler lors de la soumission du formulaire
    children: PropTypes.node.isRequired, // Enfants du formulaire (champs, boutons, etc.)
    className: PropTypes.string, // Classes CSS supplémentaires pour le formulaire
};

Form.defaultProps = {
    className: '', // Par défaut, aucune classe CSS supplémentaire
};

export default Form;
