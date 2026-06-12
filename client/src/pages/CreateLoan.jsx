import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { createLoan } from '../services/api';

export default function CreateLoan() {
  const { data: equipments, loading: equipmentsLoading, error: equipmentsError } = useFetch('/api/equipments');
  const [formData, setFormData] = useState({
    studentId: '',
    matricule: '',
    equipmentId: '',
    referenceCode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [availableEquipments, setAvailableEquipments] = useState([]);

  useEffect(() => {
    if (equipments) {
      setAvailableEquipments(equipments.filter(e => e.status === 'En stock'));
    }
  }, [equipments]);

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
      const payload = {
        studentId: formData.studentId || formData.matricule,
        matricule: formData.matricule,
        ...(formData.equipmentId && { equipmentId: formData.equipmentId }),
        ...(formData.referenceCode && { referenceCode: formData.referenceCode })
      };

      const result = await createLoan(payload);

      if (!result.loan) {
        throw new Error(result.message || 'Erreur lors de la création de la demande');
      }

      setSubmitSuccess(true);
      setFormData({
        studentId: '',
        matricule: '',
        equipmentId: '',
        referenceCode: ''
      });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (equipmentsLoading) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Chargement des équipements disponibles...</p>
    </div>
  );

  if (equipmentsError) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <p>Erreur: {equipmentsError}</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Créer une Demande d'Emprunt</h1>
      </div>

      {submitSuccess && (
        <div style={{ padding: '1rem', backgroundColor: '#d4edda', color: '#155724', marginBottom: '1rem', borderRadius: '4px' }}>
          Demande de prêt créée avec succès !
        </div>
      )}

      {submitError && (
        <div style={{ padding: '1rem', backgroundColor: '#f8d7da', color: '#721c24', marginBottom: '1rem', borderRadius: '4px' }}>
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="matricule" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Matricule de l'Étudiant *
          </label>
          <input
            type="text"
            id="matricule"
            name="matricule"
            value={formData.matricule}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Équipement *
          </label>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="radio"
                name="equipmentType"
                value="reference"
                checked={!formData.equipmentId}
                onChange={() => setFormData(prev => ({ ...prev, equipmentId: '' }))}
              />
              Par code de référence
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="radio"
                name="equipmentType"
                value="list"
                checked={!!formData.equipmentId}
                onChange={() => setFormData(prev => ({ ...prev, referenceCode: '' }))}
              />
              Sélectionner depuis la liste
            </label>
          </div>

          {formData.equipmentId ? (
            <select
              id="equipmentId"
              name="equipmentId"
              value={formData.equipmentId}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
            >
              <option value="">Sélectionnez un équipement</option>
              {availableEquipments.map(equip => (
                <option key={equip._id} value={equip._id}>
                  {equip.name} ({equip.referenceCode}) - {equip.category}
                </option>
              ))}
            </select>
          ) : (
            <select
              id="referenceCode"
              name="referenceCode"
              value={formData.referenceCode}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
            >
              <option value="">Sélectionnez un code de référence</option>
              {availableEquipments.map(equip => (
                <option key={equip._id} value={equip.referenceCode}>
                  {equip.referenceCode} - {equip.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {availableEquipments.length === 0 && (
          <div style={{ padding: '1rem', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '4px', marginBottom: '1rem' }}>
            Aucun équipement disponible en stock pour l'emprunt.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || availableEquipments.length === 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isSubmitting || availableEquipments.length === 0 ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (isSubmitting || availableEquipments.length === 0) ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            marginTop: '1rem'
          }}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Créer la Demande'}
        </button>
      </form>
    </div>
  );
}
