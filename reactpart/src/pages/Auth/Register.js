import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisez `useNavigate` pour la navigation après l'inscription
import { registerUser } from '../../services/api'; // Importez la fonction d'API pour l'enregistrement
import './Auth.css'; // Importez le fichier de styles

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Instanciez `useNavigate` pour la navigation

    // Fonction pour gérer les changements d'input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifiez que les mots de passe correspondent
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        // Essayez d'inscrire l'utilisateur
        try {
            const response = await registerUser(formData);
            if (response.success) {
                setSuccess(true); // Inscription réussie
                setError(null);
                // Redirigez vers la page d'accueil après l'inscription
                navigate('/'); // Navigue vers la page d'accueil
            } else {
                setError('Erreur lors de l\'inscription.');
            }
        } catch (err) {
            setError('Erreur lors de l\'inscription.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Inscription</h2>
            {success ? (
                <p>Inscription réussie! Redirection vers la page d'accueil...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Affiche les erreurs si présentes */}
                    {error && <p className="error">{error}</p>}
                    
                    {/* Input pour le nom */}
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
                    
                    {/* Input pour l'email */}
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
                    
                    {/* Input pour le mot de passe */}
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
                    
                    {/* Input pour la confirmation du mot de passe */}
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
                    
                    {/* Bouton pour soumettre le formulaire */}
                    <button type="submit">S'inscrire</button>
                </form>
            )}
            
            {/* Ajoutez une phrase avec un lien vers la page de login */}
            <p className="login-link">
                Vous avez déjà un compte ? <a href="/login">Login now</a>
            </p>
        </div>
    );
};

export default Register;
