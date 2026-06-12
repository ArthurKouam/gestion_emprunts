import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '12px', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Gestion des Emprunts de Matériel</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>Système complet pour gérer les emprunts d'équipements par les étudiants</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #dee2e6', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <h2 style={{ color: '#007bff', marginTop: 0, marginBottom: '1rem' }}>📦 Équipements</h2>
          <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>Gérez la liste complète des équipements disponibles, ajoutez, modifiez et consultez leur statut.</p>
          <Link to="/equipments" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
            Voir les équipements →
          </Link>
        </div>

        <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #dee2e6', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <h2 style={{ color: '#28a745', marginTop: 0, marginBottom: '1rem' }}>📝 Demandes</h2>
          <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>Consultez toutes les demandes d'emprunt, filtrez par étudiant et gérez les statuts.</p>
          <Link to="/loans" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>
            Voir les demandes →
          </Link>
        </div>

        <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #dee2e6', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <h2 style={{ color: '#ffc107', marginTop: 0, marginBottom: '1rem' }}>➕ Nouvelle Demande</h2>
          <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>Créez une nouvelle demande d'emprunt pour un étudiant avec un équipement disponible.</p>
          <Link to="/loans/create" style={{ color: '#ffc107', textDecoration: 'none', fontWeight: 'bold' }}>
            Créer une demande →
          </Link>
        </div>

        <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', border: '1px solid #dee2e6', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <h2 style={{ color: '#6c757d', marginTop: 0, marginBottom: '1rem' }}>👤 Mes Demandes</h2>
          <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>Consultez l'historique de vos demandes d'emprunt en entrant votre matricule.</p>
          <Link to="/my-loans" style={{ color: '#6c757d', textDecoration: 'none', fontWeight: 'bold' }}>
            Voir mes demandes →
          </Link>
        </div>
      </div>

      <div style={{ backgroundColor: '#e7f3ff', padding: '2rem', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
        <h3 style={{ color: '#0056b3', marginTop: 0, marginBottom: '1rem' }}>Statuts des Équipements et Demandes</h3>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#28a745', borderRadius: '50%' }}></span>
            <span><strong>En stock</strong> / Approuvé</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#ffc107', borderRadius: '50%' }}></span>
            <span><strong>Emprunté</strong> / En attente</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#dc3545', borderRadius: '50%' }}></span>
            <span><strong>Maintenance</strong> / Refusé</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#6c757d', borderRadius: '50%' }}></span>
            <span><strong>Terminé</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
