import React, { useState } from 'react';
import { loginUser } from '../../services/api'; // Importez la fonction d'API pour la connexion
import './Authentication.css'; // Importez le fichier de styles

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);
            if (response.success) {
                setSuccess(true); // Connexion réussie
                setError(null);
                // Gérez d'autres actions après la connexion, par exemple, rediriger l'utilisateur
            } else {
                setError('Erreur lors de la connexion.');
            }
        } catch (err) {
            setError('Erreur lors de la connexion.');
        }
    };

    return (
        <div className="auth-form">
            <h2>Connexion</h2>
            {success ? (
                <p>Connexion réussie!</p> // Message de succès
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>} {/* Affiche l'erreur si présente */}
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            )}
        </div>
    );
};

export default LoginForm;
