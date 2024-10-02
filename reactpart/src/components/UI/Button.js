import React from 'react';
import PropTypes from 'prop-types';
import './UI.css'; // Assurez-vous d'importer le fichier de styles

const Button = ({ onClick, children, className = '', disabled = false, type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired, // Fonction à appeler lorsque le bouton est cliqué
    children: PropTypes.node.isRequired, // Contenu du bouton (texte, icône, etc.)
    className: PropTypes.string, // Classes CSS supplémentaires pour le bouton
    disabled: PropTypes.bool, // État d'activation ou de désactivation du bouton
    type: PropTypes.string, // Type de bouton (submit, button, reset)
};

Button.defaultProps = {
    className: '', // Par défaut, aucune classe CSS supplémentaire
    disabled: false, // Par défaut, le bouton est activé
    type: 'button', // Par défaut, le type est un bouton classique
};

export default Button;
