import { useState, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { createLoan } from '../services/api';
import useFetch from '../hooks/useFetch';
import EquipmentCard from '../components/EquipmentCard';

const statusClass = {
  'En attente': 'pending',
  Approuve: 'approved',
  Refuse: 'rejected',
  Termine: 'done',
};

const statusLabel = {
  'En attente': 'En attente',
  Approuve: 'Approuvée',
  Refuse: 'Refusée',
  Termine: 'Terminée',
};

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Inventory state
  const { data: equipments, loading: equipmentsLoading, error: equipmentsError, refetch: refetchEquipments } = useFetch('/api/equipments');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');
  
  // Modal state
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [modalMessage, setModalMessage] = useState(null);
  const [submittingLoan, setSubmittingLoan] = useState(false);
  
  // Tracking state
  const [trackingId, setTrackingId] = useState('');
  const [submittedTrackingId, setSubmittedTrackingId] = useState('');
  const { data: studentLoans, loading: loansLoading, error: loansError, refetch: refetchLoans } = useFetch(
    submittedTrackingId ? `/api/loans/student/${submittedTrackingId}` : null
  );

  // Compute category list
  const categories = useMemo(() => {
    const values = new Set((equipments || []).map((eq) => eq.category));
    return ['Tous', ...values];
  }, [equipments]);

  // Filter equipments
  const filteredEquipments = useMemo(() => {
    return (equipments || []).filter((eq) => {
      const haystack = `${eq.name} ${eq.referenceCode} ${eq.category}`.toLowerCase();
      const matchesSearch = haystack.includes(search.trim().toLowerCase());
      const matchesCategory = category === 'Tous' || eq.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, equipments, search]);

  const handleOpenReserveModal = (equipment) => {
    setSelectedEquipment(equipment);
    setStudentId('');
    setModalMessage(null);
  };

  const handleCloseModal = () => {
    setSelectedEquipment(null);
    setStudentId('');
    setModalMessage(null);
  };

  const handleSubmitLoan = async (event) => {
    event.preventDefault();
    if (!selectedEquipment) return;
    
    setSubmittingLoan(true);
    setModalMessage(null);

    try {
      await createLoan({
        studentId: studentId.trim(),
        equipmentId: selectedEquipment._id,
      });
      
      setModalMessage({ type: 'success', text: 'Votre demande de prêt a été créée avec succès et est en attente de validation.' });
      refetchEquipments();
      
      // If student is currently tracking their own ID, refresh that list too
      if (submittedTrackingId && submittedTrackingId.toLowerCase() === studentId.trim().toLowerCase()) {
        refetchLoans();
      }
      
      // Auto close after 2 seconds on success
      setTimeout(() => {
        handleCloseModal();
      }, 2200);
      
    } catch (err) {
      setModalMessage({ type: 'error', text: err.message });
    } finally {
      setSubmittingLoan(false);
    }
  };

  const handleSearchTracking = (event) => {
    event.preventDefault();
    setSubmittedTrackingId(trackingId.trim());
  };

  return (
    <div className="student-portal">
      <Breadcrumbs items={[{ to: '/', label: 'Accueil' }, { label: 'Espace Étudiant' }]} />

      <div className="tabs" role="tablist" aria-label="Espace Étudiant">
        <button
          className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
          type="button"
          onClick={() => setActiveTab('inventory')}
        >
          Matériels disponibles
        </button>
        <button
          className={`tab ${activeTab === 'tracking' ? 'active' : ''}`}
          type="button"
          onClick={() => setActiveTab('tracking')}
        >
          Suivre mes demandes
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <section className="inventory-section">
          <div className="toolbar glassmorphism">
            <input
              className="search-input"
              type="search"
              placeholder="Rechercher un matériel (nom, catégorie, référence...)"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="form-control"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={{ maxWidth: 260 }}
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {equipmentsLoading ? (
            <div className="panel empty-state">Chargement de l'inventaire...</div>
          ) : equipmentsError ? (
            <div className="notice error">
              {equipmentsError}
              <button className="button secondary" type="button" onClick={refetchEquipments} style={{ marginLeft: '0.75rem' }}>
                Réessayer
              </button>
            </div>
          ) : filteredEquipments.length > 0 ? (
            <div className="grid">
              {filteredEquipments.map((equipment) => (
                <EquipmentCard
                  key={equipment._id}
                  equipment={equipment}
                  onReserve={handleOpenReserveModal}
                />
              ))}
            </div>
          ) : (
            <div className="panel empty-state">Aucun équipement ne correspond à votre recherche.</div>
          )}
        </section>
      ) : (
        <section className="tracking-section panel glassmorphism">
          <div className="panel-body">
            <form className="toolbar" onSubmit={handleSearchTracking}>
              <input
                className="search-input"
                type="text"
                required
                placeholder="Saisissez votre matricule étudiant (ex: 23INF042)"
                value={trackingId}
                onChange={(event) => setTrackingId(event.target.value)}
              />
              <button className="button" type="submit">Rechercher</button>
            </form>

            {loansLoading && submittedTrackingId && <div className="empty-state">Chargement de vos demandes...</div>}
            {loansError && <div className="notice error">{loansError}</div>}

            {!submittedTrackingId && (
              <div className="empty-state">
                Saisissez votre matricule ci-dessus pour consulter le statut de vos demandes de prêt.
              </div>
            )}

            {submittedTrackingId && !loansLoading && !loansError && (
              studentLoans?.length > 0 ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Matériel</th>
                        <th>Référence</th>
                        <th>Date de demande</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentLoans.map((loan) => (
                        <tr key={loan._id}>
                          <td><strong>{loan.equipmentId?.name || 'Équipement supprimé'}</strong></td>
                          <td><span className="code-badge">{loan.equipmentId?.referenceCode || '-'}</span></td>
                          <td>{new Date(loan.requestDate).toLocaleString('fr-FR')}</td>
                          <td>
                            <span className={`status ${statusClass[loan.status] || 'done'}`}>
                              {statusLabel[loan.status] || loan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">Aucune demande trouvée pour le matricule "{submittedTrackingId}".</div>
              )
            )}
          </div>
        </section>
      )}

      {/* Reservation Modal Overlay */}
      {selectedEquipment && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content glassmorphism" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Demande d'emprunt</h2>
              <button className="close-button" onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="equipment-summary">
                <span className="kicker">{selectedEquipment.category}</span>
                <h3>{selectedEquipment.name}</h3>
                <p className="meta">Référence : {selectedEquipment.referenceCode}</p>
              </div>

              {modalMessage && (
                <div className={`notice ${modalMessage.type}`}>
                  {modalMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmitLoan}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="modalStudentId">Votre Matricule Étudiant</label>
                  <input
                    className="form-control"
                    id="modalStudentId"
                    type="text"
                    required
                    disabled={submittingLoan || (modalMessage && modalMessage.type === 'success')}
                    placeholder="Entrez votre matricule (Ex: 23INF042)"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                </div>
                <div className="modal-actions">
                  <button
                    className="button secondary"
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submittingLoan}
                  >
                    Annuler
                  </button>
                  <button
                    className="button"
                    type="submit"
                    disabled={submittingLoan || !studentId.trim() || (modalMessage && modalMessage.type === 'success')}
                  >
                    {submittingLoan ? 'Envoi en cours...' : 'Confirmer la demande'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
