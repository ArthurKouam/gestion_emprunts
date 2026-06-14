import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EquipmentCard from './EquipmentCard';
import useFetch from '../hooks/useFetch';

export default function InventoryList() {
  const navigate = useNavigate();
  const { data: equipments, loading, error, refetch } = useFetch('/api/equipments');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tous');

  const categories = useMemo(() => {
    const values = new Set((equipments || []).map((equipment) => equipment.category));
    return ['Tous', ...values];
  }, [equipments]);

  const filteredEquipments = useMemo(() => {
    return (equipments || []).filter((equipment) => {
      const haystack = `${equipment.name} ${equipment.referenceCode} ${equipment.category}`.toLowerCase();
      const matchesSearch = haystack.includes(search.trim().toLowerCase());
      const matchesCategory = category === 'Tous' || equipment.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, equipments, search]);

  const handleReserve = (equipment) => {
    navigate(`/loans/create?equipmentId=${equipment._id}`, { state: { equipment } });
  };

  if (loading) {
    return <div className="panel empty-state">Chargement de l'inventaire...</div>;
  }

  if (error) {
    return (
      <div className="notice error">
        {error}
        <button className="button secondary" type="button" onClick={refetch} style={{ marginLeft: '0.75rem' }}>
          Reessayer
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Rechercher un nom, une categorie ou une reference"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select className="form-control" value={category} onChange={(event) => setCategory(event.target.value)} style={{ maxWidth: 260 }}>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {filteredEquipments.length > 0 ? (
        <div className="grid">
          {filteredEquipments.map((equipment) => (
            <EquipmentCard key={equipment._id} equipment={equipment} onReserve={handleReserve} />
          ))}
        </div>
      ) : (
        <div className="panel empty-state">Aucun equipement ne correspond a votre recherche.</div>
      )}
    </section>
  );
}
