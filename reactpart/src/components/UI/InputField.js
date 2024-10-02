import React from 'react';
import PropTypes from 'prop-types';
import './UI.css'; // Assurez-vous d'importer le fichier de styles

const InputField = ({
    type = 'text',
    value = '',
    onChange,
    placeholder = '',
    className = '',
    disabled = false,
    required = false,
    name = ''
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-field ${className}`}
            disabled={disabled}
            required={required}
            name={name}
        />
    );
};

InputField.propTypes = {
    type: PropTypes.string, // Type de champ (text, email, password, etc.)
    value: PropTypes.string, // Valeur actuelle du champ
    onChange: PropTypes.func.isRequired, // Fonction appelée lors du changement de valeur
    placeholder: PropTypes.string, // Texte d'appoint affiché lorsque le champ est vide
    className: PropTypes.string, // Classes CSS supplémentaires pour le champ
    disabled: PropTypes.bool, // Indique si le champ est désactivé
    required: PropTypes.bool, // Indique si le champ est requis
    name: PropTypes.string, // Nom du champ pour l'utilisation dans les formulaires
};

InputField.defaultProps = {
    type: 'text',
    value: '',
    placeholder: '',
    className: '',
    disabled: false,
    required: false,
    name: '',
};

export default InputField;
