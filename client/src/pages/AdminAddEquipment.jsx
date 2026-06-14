import { useState } from 'react';
import { addEquipment } from '../services/api';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  name: '',
  category: '',
  referenceCode: '',
  status: 'En stock',
};

export default function AdminAddEquipment() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      await addEquipment(form);
      setMessage({ type: 'success', text: 'Équipement ajouté au catalogue.' });
      setForm(initialForm);
      // optional: navigate to catalogue
      // navigate('/equipments');
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Ajouter un équipement</h2>
      </div>
      <div className="panel-body">
        {message && <div className={`notice ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit} className="form-grid form-vertical">
          <div className="form-group full-span">
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" className="form-control" placeholder="Raspberry Pi 4 Model B" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <input id="category" name="category" className="form-control" placeholder="Microcontrôleur" value={form.category} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="referenceCode">Code référence</label>
            <input id="referenceCode" name="referenceCode" className="form-control" placeholder="REF-RPI4-001" value={form.referenceCode} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="status">Statut initial</label>
            <select id="status" name="status" className="form-control" value={form.status} onChange={handleChange}>
              <option value="En stock">En stock</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="full-span" style={{ marginTop: '0.5rem' }}>
            <button className="button" type="submit" disabled={submitting}>{submitting ? 'Ajout...' : 'Ajouter'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
