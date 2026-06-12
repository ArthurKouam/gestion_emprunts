import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/equipments';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await loginUser(formData);

      if (result.message) {
        throw new Error(result.message);
      }

      login(result, result.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1.8rem' }}>Connexion Admin</h1>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>Gestion des Emprunts de Matériel</p>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
            marginBottom: '1.5rem',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="admin@example.com"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1.05rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => !isSubmitting && (e.target.style.opacity = '0.95')}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Se connecter pour gérer les équipements et les demandes d'emprunt.
          </p>
        </div>
      </div>
    </div>
  );
}
