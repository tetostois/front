
import React, { useState } from 'react';

const LoginSingup = () => {
  const [emailTel, setEmailTel] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Ajoutez un état pour la gestion des erreurs

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation du champ emailTel
    if (!validateInput(emailTel)) {
      setError("Format d'email ou de téléphone invalide");
      return;
    }

    // Handle form submission logic here (authentication)
    console.log('Email/Telephone:', emailTel);
    console.log('Password:', password);

    // Réinitialisez l'erreur après la soumission réussie
    setError(null);
  };

  const validateInput = (value) => {
    // Regex pour email
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Regex pour numéro de téléphone (simplifié)
    const phoneRegex = /^\d+$/;

    return emailRegex.test(value) || phoneRegex.test(value);
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affichez l'erreur s'il y en a */}
      <label htmlFor="emailTel">Email ou Numéro de téléphone</label>
      <input
        type="text"
        className="form-control"
        id="emailTel"
        placeholder="Email ou Numéro de téléphone"
        value={emailTel}
        onChange={(e) => setEmailTel(e.target.value)}
        required
        style={{ marginBottom: '10px' }}
      />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ marginBottom: '10px' }}
      />

      <div className="mt-3 d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
        <button type="button" className="btn btn-outline-primary">
          Créer un compte
        </button>
      </div>

      <div className="mt-3 d-flex justify-content-between">
        <a href="#" className="text-muted">
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  );
};

export default LoginSingup;

// fichier modifier
