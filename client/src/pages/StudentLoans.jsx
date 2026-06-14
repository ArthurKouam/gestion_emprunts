import { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import useFetch from '../hooks/useFetch';

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

export default function StudentLoans() {
  const [studentId, setStudentId] = useState('');
  const [submittedId, setSubmittedId] = useState('');
  const { data: loans, loading, error } = useFetch(
    submittedId ? `/api/loans/student/${submittedId}` : null
  );

  const handleSearch = (event) => {
    event.preventDefault();
    setSubmittedId(studentId.trim());
  };

  return (
    <>
      <Breadcrumbs items={[{ to: '/student', label: 'Espace Étudiant' }, { label: 'Suivi des demandes' }]} />

      <section className="panel">
        <div className="panel-body">
          <form className="toolbar" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              required
              placeholder="Matricule etudiant"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
            />
            <button className="button" type="submit">Rechercher</button>
          </form>

          {loading && submittedId && <p>Chargement des demandes...</p>}
          {error && <div className="notice error">{error}</div>}

          {!submittedId && <div className="empty-state">Aucune recherche lancee.</div>}

          {submittedId && !loading && !error && (
            loans?.length > 0 ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Materiel</th>
                      <th>Reference</th>
                      <th>Date</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => (
                      <tr key={loan._id}>
                        <td>{loan.equipmentId?.name || 'Equipement supprime'}</td>
                        <td>{loan.equipmentId?.referenceCode || '-'}</td>
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
              <div className="empty-state">Aucune demande trouvee pour ce matricule.</div>
            )
          )}
        </div>
      </section>
    </>
  );
}
