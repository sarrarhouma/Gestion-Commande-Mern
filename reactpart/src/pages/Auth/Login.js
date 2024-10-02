import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisez `useNavigate` pour la navigation après la connexion
import { loginClient } from '../../services/api'; // Importez la fonction d'API pour la connexion
import './Auth.css'; // Importez le fichier de styles

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
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
        e.preventDefault(); // Empêche la soumission par défaut du formulaire
        console.log('Form submission started');
        console.log('Form data:', formData);
        
        try {
            const response = await loginClient(formData);
            console.log('API response:', response);
            
            if (response) {
                //console.log('Token received:', response.token);
                //localStorage.setItem('accessToken', response.token);
                // Redirigez vers la page d'accueil ou la page souhaitée après la connexion
                navigate('/home');
            } else {
                console.log('Response error:', response ? response.message : 'Unknown error');
                setError(response ? response.message : 'Erreur lors de la connexion.');
            }
        } catch (err) {
            console.error('Error during API call:', err);
            setError('Erreur lors de la connexion.');
        }
        console.log('Form submission ended');
    };

    return (
        <div className="auth-container">
            <h2>Connexion</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                
                {/* Bouton pour soumettre le formulaire */}
                <button type="submit">Se connecter</button>
            </form>
            
            {/* Ajoutez une phrase avec un lien vers la page d'enregistrement */}
            <p className="register-link">
                Vous n'avez pas de compte ? <a href="/register">S'inscrire maintenant</a>
            </p>
        </div>
    );
};

export default Login;
