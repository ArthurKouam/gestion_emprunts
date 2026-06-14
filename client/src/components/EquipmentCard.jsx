export default function EquipmentCard({ equipment, onReserve }) {
  const isAvailable = equipment.status === 'En stock';

  return (
    <article className="equipment-card">
      <div>
        <div className="kicker">{equipment.category}</div>
        <h3>{equipment.name}</h3>
        <p className="meta">Reference : {equipment.referenceCode}</p>
      </div>

      <div>
        <span className={`status ${isAvailable ? 'available' : 'unavailable'}`}>
          {isAvailable ? 'En stock' : 'Indisponible'}
        </span>
      </div>

      <button
        className="button"
        disabled={!isAvailable}
        type="button"
        onClick={() => onReserve(equipment)}
      >
        Demander
      </button>
    </article>
  );
}
