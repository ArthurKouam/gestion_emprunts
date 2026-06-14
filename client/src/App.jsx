import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/About';
import CreateLoan from './pages/CreateLoan';
import EquipmentList from './pages/EquipmentList';
import LoanList from './pages/LoanList';
import AdminAddEquipment from './pages/AdminAddEquipment';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import StudentLoans from './pages/StudentLoans';
import StudentPortal from './pages/StudentPortal';
import Sidebar from './components/Sidebar';
import './styles/layout.css';
import './styles/components.css';
import './styles/portal.css';



function AppContent() {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith('/loans') || location.pathname.startsWith('/equipments') || location.pathname.startsWith('/settings');

  return (
    <div className="app-shell">
      {isAdminArea ? (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Sidebar />
          <main className="main-content">
            <Routes>
              
                <Route path="/loans" element={<LoanList />} />
              <Route path="/loans/list" element={<LoanList />} />
              <Route path="/loans/create" element={<CreateLoan />} />
              <Route path="/equipments" element={<EquipmentList />} />
              <Route path="/equipments/add" element={<AdminAddEquipment />} />
              <Route path="/settings" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      ) : (
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/student" element={<StudentPortal />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-loans" element={<StudentLoans />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
