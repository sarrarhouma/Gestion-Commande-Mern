import React, { useState } from 'react';
import { registerUser } from '../../services/api'; // Importez la fonction d'API pour l'enregistrement
import './Authentication.css'; // Importez le fichier de styles
import './LoginForm.js'; // Importez le fichier de login

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await registerUser(formData);
            if (response.success) {
                setSuccess(true); // Inscription réussie
                setError(null);
                // Gérez d'autres actions après l'inscription, par exemple, rediriger l'utilisateur
            } else {
                setError('Erreur lors de l\'inscription.');
            }
        } catch (err) {
            setError('Erreur lors de l\'inscription.');
        }
    };

    return (
        <div className="auth-form">
            <h2>Inscription</h2>
            {success ? (
                <p>Inscription réussie!</p> // Message de succès
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>} {/* Affiche l'erreur si présente */}
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                    <div>
                        <label>Confirmez le mot de passe:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">S'inscrire</button>
                </form>
            )}
            {/* Ajoutez la phrase avec le lien vers la page de login */}
            <p className="login-link">
                Vous avez déjà un compte ? <a href="/login">Login now</a>
            </p>
        </div>
    );
};

export default RegisterForm;
