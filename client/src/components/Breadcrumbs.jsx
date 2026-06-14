import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Fil d'Ariane" style={{ marginBottom: '1rem' }}>
      {items.map((it, idx) => (
        <span key={idx} style={{ display: 'inline-flex', alignItems: 'center' }}>
          {it.to ? (
            <Link to={it.to} className="back-link">{it.label}</Link>
          ) : (
            <span style={{ color: '#0f172a' }}>{it.label}</span>
          )}
          {idx < items.length - 1 && <span className="separator">/</span>}
        </span>
      ))}
    </nav>
  );
}
