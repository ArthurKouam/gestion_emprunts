import { useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function StudentLoans() {
  const [studentId, setStudentId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { data: loans, loading, error } = useFetch(
    submitted && studentId ? `/api/loans/student/${studentId}` : null
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente': return '#ffc107';
      case 'Approuve': return '#28a745';
      case 'Refuse': return '#dc3545';
      case 'Termine': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (studentId.trim()) {
      setSubmitted(true);
    }
  };

  if (loading) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Chargement de vos demandes d'emprunt...</p>
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
        <h1>Mes Demandes d'Emprunt</h1>
      </div>

      <form onSubmit={handleSearch} style={{
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '1px solid #dee2e6'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Rechercher vos demandes</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Entrez votre matricule"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            style={{ flex: 1, padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
          />
          <button
            type="submit"
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
            Rechercher
          </button>
        </div>
      </form>

      {submitted && studentId && (
        <>
          {loans && loans.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <h2 style={{ marginBottom: '1rem' }}>Demandes pour l'étudiant: {studentId}</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f1f1f1' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Équipement</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Date de Demande</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '1rem' }}>
                        {loan.equipmentId?.name || loan.equipmentId?._id || 'N/A'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {new Date(loan.requestDate).toLocaleString('fr-FR')}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: getStatusColor(loan.status),
                          color: 'white',
                          borderRadius: '4px',
                          fontSize: '0.875rem'
                        }}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
              <p>Aucune demande d'emprunt trouvée pour l'étudiant: {studentId}</p>
            </div>
          )}
        </>
      )}

      {!submitted && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
          <p>Entrez votre matricule pour voir vos demandes d'emprunt.</p>
        </div>
      )}
    </div>
  );
}
