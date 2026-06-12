import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import EquipmentList from './pages/EquipmentList'
import LoanList from './pages/LoanList'
import CreateLoan from './pages/CreateLoan'
import StudentLoans from './pages/StudentLoans'
import './App.css'

function AuthButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (user) {
    return (
      <>
        <li style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: '#333', fontWeight: '500' }}>Connecté: {user.name}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.95rem'
            }}
          >
            Déconnexion
          </button>
        </li>
      </>
    );
  }

  return (
    <li style={{ marginLeft: 'auto' }}>
      <Link 
        to="/login" 
        style={{
          textDecoration: 'none', 
          color: '#333', 
          padding: '0.5rem 1rem', 
          borderRadius: '4px',
          transition: 'background-color 0.2s',
          backgroundColor: '#28a745'
        }} 
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Connexion
      </Link>
    </li>
  );
}

function AppContent() {
  return (
    <>
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap', alignItems: 'center' }}>
          <li><Link to="/" style={{ textDecoration: 'none', color: '#333', padding: '0.5rem 1rem', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Accueil</Link></li>
          <li><Link to="/equipments" style={{ textDecoration: 'none', color: '#333', padding: '0.5rem 1rem', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Équipements</Link></li>
          <li><Link to="/loans" style={{ textDecoration: 'none', color: '#333', padding: '0.5rem 1rem', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Demandes</Link></li>
          <li><Link to="/loans/create" style={{ textDecoration: 'none', color: '#333', padding: '0.5rem 1rem', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Nouvelle Demande</Link></li>
          <li><Link to="/my-loans" style={{ textDecoration: 'none', color: '#333', padding: '0.5rem 1rem', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Mes Demandes</Link></li>
          <li><Link to="/about" style={{ textDecoration: 'none', color: '#333', padding: '0.5rem 1rem', borderRadius: '4px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>À propos</Link></li>
          <AuthButton />
        </ul>
      </nav>
      
      <main style={{ padding: '2rem', minHeight: 'calc(100vh - 100px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-loans" element={<StudentLoans />} />
          
          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/equipments" element={<EquipmentList />} />
            <Route path="/loans" element={<LoanList />} />
            <Route path="/loans/create" element={<CreateLoan />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
