import { useState } from 'react';
import { List, PlusSquare, Users, Settings, LogOut, Menu, ChevronLeft } from 'lucide-react';
import SidebarItem from './SidebarItem';
import './Sidebar.css';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/equipments', icon: List, label: 'Équipements' },
  { to: '/equipments/add', icon: PlusSquare, label: 'Ajouter équipement' },
  { to: '/loans', icon: Users, label: 'Demandes' },
  { to: '/settings', icon: Settings, label: 'Paramètres' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">IT</div>
          {!collapsed && <div className="sidebar-logo-name">Gestion IT</div>}
        </div>

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed((s) => !s)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        {!collapsed && <div className="sidebar-section-title">Administration</div>}
        {navItems.map((item) => (
          <SidebarItem key={item.to} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} />
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className={`sidebar-user ${collapsed ? 'collapsed' : ''}`} onClick={() => {}}>
          <div className="sidebar-user-avatar">{user && user.name ? user.name.charAt(0) : 'U'}</div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'Admin'}</div>
              <div className="sidebar-user-email">{user?.email || ''}</div>
            </div>
          )}
        </div>
        <div style={{ padding: '0 0.75rem' }}>
          <button className="button secondary" onClick={handleLogout} style={{ width: '100%' }}>
            Déconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}
