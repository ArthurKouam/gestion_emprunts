import { NavLink } from 'react-router-dom';

export default function SidebarItem({ to, icon: Icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar-item ${isActive ? 'sidebar-item--active' : ''}`
      }
    >
      <div className="sidebar-item-icon">
        {Icon ? <Icon size={18} /> : null}
      </div>
      {!collapsed && <span className="sidebar-item-label">{label}</span>}
    </NavLink>
  );
}
