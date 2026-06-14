import { useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { createLoan } from '../services/api';
import useFetch from '../hooks/useFetch';

export default function CreateLoan() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const requestedEquipmentId = searchParams.get('equipmentId') || location.state?.equipment?._id || '';
  const { data: equipments, loading, error } = useFetch('/api/equipments');
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedEquipment = useMemo(() => {
    if (!requestedEquipmentId) return null;
    return (equipments || []).find((item) => item._id === requestedEquipmentId) || location.state?.equipment || null;
  }, [equipments, location.state?.equipment, requestedEquipmentId]);

  const availabilityMessage = useMemo(() => {
    if (!requestedEquipmentId || loading) return null;
    if (!selectedEquipment) {
      return { type: 'error', text: "Cet equipement est introuvable. Choisissez un materiel depuis l'inventaire." };
    }
    if (selectedEquipment.status !== 'En stock') {
      return { type: 'error', text: "Cet equipement n'est plus en stock." };
    }
    return null;
  }, [loading, requestedEquipmentId, selectedEquipment]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedEquipment || selectedEquipment.status !== 'En stock') {
      setMessage({ type: 'error', text: "Selectionnez un equipement disponible avant d'envoyer la demande." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      await createLoan({
        studentId: studentId.trim(),
        equipmentId: selectedEquipment._id,
      });
      setStudentId('');
      setMessage({ type: 'success', text: 'Demande creee avec succes. Elle est maintenant en attente de validation.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="panel empty-state">Verification du materiel selectionne...</div>;
  }

  if (error) {
    return <div className="notice error">{error}</div>;
  }

  if (!requestedEquipmentId) {
    return (
      <section className="panel empty-state">
        <Breadcrumbs items={[{ to: '/equipments', label: 'Inventaire' }, { label: "Demande d'emprunt" }]} />
        <p>Choisissez d'abord un equipement en stock dans l'inventaire.</p>
        <Link className="button" to="/equipments" style={{ marginTop: '1rem' }}>
          Voir l'inventaire
        </Link>
      </section>
    );
  }

  const canSubmit = selectedEquipment?.status === 'En stock' && !submitting;

  return (
    <>
      <Breadcrumbs items={[{ to: '/equipments', label: 'Inventaire' }, { label: 'Demande d\'emprunt' }]} />

      <section className="panel">
        <div className="panel-header">
          <h2>Materiel selectionne</h2>
        </div>
        <div className="panel-body">
          {selectedEquipment ? (
            <>
              <h3 style={{ marginTop: 0 }}>{selectedEquipment.name}</h3>
              <p className="meta">
                {selectedEquipment.category} | {selectedEquipment.referenceCode} | {selectedEquipment.status}
              </p>
            </>
          ) : (
            <p>Materiel introuvable.</p>
          )}
        </div>
      </section>

      <section className="panel" style={{ marginTop: '1rem' }}>
        <div className="panel-body">
          {(message || availabilityMessage) && (
            <div className={`notice ${(message || availabilityMessage).type}`}>
              {(message || availabilityMessage).text}
            </div>
          )}

          <form className="form-grid form-vertical" onSubmit={handleSubmit}>
            <div className="form-group full-span">
              <label htmlFor="studentId">Matricule etudiant</label>
              <input
                className="form-control"
                id="studentId"
                type="text"
                required
                value={studentId}
                onChange={(event) => setStudentId(event.target.value)}
                disabled={!canSubmit}
                placeholder="Ex: 23INF042"
              />
            </div>
            <div className="actions full-span" style={{ justifyContent: 'flex-start' }}>
              <button className="button" type="submit" disabled={!canSubmit}>
                {submitting ? 'Envoi...' : 'Envoyer la demande'}
              </button>
              <Link className="button secondary" to="/equipments">
                Choisir un autre materiel
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
