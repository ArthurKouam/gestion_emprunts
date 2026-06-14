import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/loans';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await loginUser(formData);
      login(result, result.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <Link className="back-link" to="/">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Retour à l'accueil
      </Link>

      <section className="portal-card glassmorphism login-card">
        <div className="portal-card-header" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div className="role-icon admin-icon" style={{ margin: '0 auto 1rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Connexion Administrateur</h2>
          <p>Saisissez vos identifiants pour accéder à la gestion du laboratoire.</p>
        </div>

        <div className="portal-card-body">
          {error && <div className="notice error">{error}</div>}

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group full-span">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nom@exemple.com"
              />
            </div>
            <div className="form-group full-span">
              <label htmlFor="password">Mot de passe</label>
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
              />
            </div>
            <div className="full-span" style={{ marginTop: '0.5rem' }}>
              <button className="button dark-solid large-button" type="submit" disabled={submitting}>
                {submitting ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
