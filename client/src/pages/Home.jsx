import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Home() {
  const navigate = useNavigate();

  const handleStudentAccess = () => {
    navigate('/student');
  };

  const handleAdminAccess = () => {
    navigate('/login');
  };

  return (
    <div className="portal-page-wrapper">
      <div className="portal-selection-container glassmorphism">
        <header className="portal-hero">
          <Breadcrumbs items={[{ label: 'Accueil' }]} />
        </header>

        <div className="portal-grid">
          {/* Card 1: Student */}
          <button className="portal-selection-card" onClick={handleStudentAccess}>
            <div className="role-icon student-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
            <h2>Espace Étudiant</h2>
            <div className="portal-action-indicator">
              <span>Accéder</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>

          {/* Card 2: Admin */}
          <button className="portal-selection-card" onClick={handleAdminAccess}>
            <div className="role-icon admin-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2>Espace Administrateur</h2>
            <div className="portal-action-indicator">
              <span>Se connecter</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
