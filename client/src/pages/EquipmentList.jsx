import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { addEquipment } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function EquipmentList() {
  const { user } = useAuth();
  const { data: equipments, loading, error, refetch } = useFetch('/api/equipments');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    referenceCode: '',
    status: 'En stock'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await addEquipment(formData);

      if (!result.status || result.status !== 'success') {
        throw new Error(result.message || 'Erreur lors de la création');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', category: '', referenceCode: '', status: 'En stock' });
      setShowForm(false);
      refetch();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En stock': return '#28a745';
      case 'Emprunte': return '#ffc107';
      case 'Maintenance': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Chargement des équipements...</p>
    </div>
  );

  if (error) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <p>Erreur: {error}</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Liste des Équipements</h1>
        {user && (
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setSubmitError(null);
              setSubmitSuccess(false);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {showForm ? 'Annuler' : 'Ajouter un Équipement'}
          </button>
        )}
      </div>

      {submitSuccess && (
        <div style={{ padding: '1rem', backgroundColor: '#d4edda', color: '#155724', marginBottom: '1rem', borderRadius: '4px' }}>
          Équipement ajouté avec succès !
        </div>
      )}

      {showForm && user && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #dee2e6'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Ajouter un Équipement</h2>
          {submitError && (
            <div style={{ color: '#dc3545', marginBottom: '1rem' }}>
              {submitError}
            </div>
          )}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nom *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Catégorie *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="referenceCode" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Code de Référence *
            </label>
            <input
              type="text"
              id="referenceCode"
              name="referenceCode"
              value={formData.referenceCode}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="status" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Statut
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
            >
              <option value="En stock">En stock</option>
              <option value="Emprunte">Emprunté</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      )}

      {equipments && equipments.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f1f1' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Nom</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Catégorie</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Code de Référence</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equip) => (
                <tr key={equip._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem' }}>{equip.name}</td>
                  <td style={{ padding: '1rem' }}>{equip.category}</td>
                  <td style={{ padding: '1rem' }}>{equip.referenceCode}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: getStatusColor(equip.status),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {equip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
          <p>Aucun équipement trouvé.</p>
        </div>
      )}
    </div>
  );
}
