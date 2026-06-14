import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const equipmentStatusLabel = {
  'En stock': 'En stock',
  'Emprunte': 'Emprunté',
  'Maintenance': 'En maintenance',
};

export default function EquipmentList() {
  const navigate = useNavigate();
  const { data: equipments, loading, error, refetch } = useFetch('/api/equipments');

  const handleReserve = (equipment) => {
    navigate(`/loans/create?equipmentId=${equipment._id}`, { state: { equipment } });
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Fil d'Ariane" style={{ marginBottom: '1rem' }}>
        <Link to="/" className="back-link">Accueil</Link>
        <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>/</span>
        <span>Inventaire du laboratoire</span>
      </nav>

      {loading ? (
        <div className="panel empty-state">Chargement de l'inventaire...</div>
      ) : error ? (
        <div className="notice error">{error}</div>
      ) : (equipments || []).length > 0 ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Materiel</th>
                <th>Categorie</th>
                <th>Reference</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(equipments || []).map((equipment) => (
                <tr key={equipment._id}>
                  <td>
                    <strong>{equipment.name}</strong>
                    <div className="meta">{equipment.description || ''}</div>
                  </td>
                  <td>{equipment.category}</td>
                  <td>{equipment.referenceCode}</td>
                  <td>
                    <span className={`status ${equipment.status === 'En stock' ? 'available' : 'unavailable'}`}>
                      {equipmentStatusLabel[equipment.status] || equipment.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="button" type="button" onClick={() => handleReserve(equipment)}>
                        Demander
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="panel empty-state">Aucun equipement disponible.</div>
      )}
    </>
  );
}
