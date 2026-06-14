import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import useFetch from '../hooks/useFetch';
import { API_URL } from '../services/api';

export default function LoanList() {
  const { data: loans, loading, error, refetch } = useFetch('/api/loans');
  const [studentId, setStudentId] = useState('');
  const [showStudentForm, setShowStudentForm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente': return '#ffc107';
      case 'Approuve': return '#28a745';
      case 'Refuse': return '#dc3545';
      case 'Termine': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const handleUpdateStatus = async (loanId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/loans/${loanId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la mise à jour');
      }

      refetch();
      alert(result.message || 'Statut mis à jour avec succès');
    } catch (err) {
      alert(`Erreur: ${err.message}`);
    }
  };

  if (loading) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Chargement des demandes d'emprunt...</p>
    </div>
  );

  if (error) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
      <p>Erreur: {error}</p>
    </div>
  );

  const filteredLoans = studentId
    ? loans?.filter(loan => loan.studentId === studentId)
    : loans;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Breadcrumbs items={[{ to: '/', label: 'Accueil' }, { label: "Demandes d'emprunt" }]} />
        </div>
        <button 
          onClick={() => setShowStudentForm(!showStudentForm)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: showStudentForm ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {showStudentForm ? 'Annuler' : 'Filtrer par Étudiant'}
        </button>
      </div>

      {showStudentForm && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid #dee2e6',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Entrez le matricule de l'étudiant"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ flex: 1, padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
          />
          <button
            onClick={() => setStudentId('')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Effacer
          </button>
        </div>
      )}

      {filteredLoans && filteredLoans.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f1f1' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Étudiant</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Équipement</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Date de Demande</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Statut</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem' }}>{loan.studentId}</td>
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
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['En attente', 'Approuve', 'Refuse', 'Termine'].map(status => (
                        <button
                          key={status}
                          onClick={() => handleUpdateStatus(loan._id, status)}
                          disabled={loan.status === status}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: loan.status === status ? '#6c757d' : getStatusColor(status),
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loan.status === status ? 'not-allowed' : 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
          <p>Aucune demande d'emprunt trouvée{studentId ? ` pour l'étudiant ${studentId}` : ''}.</p>
        </div>
      )}
    </div>
  );
}
