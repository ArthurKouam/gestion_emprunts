import Breadcrumbs from '../components/Breadcrumbs';

export default function About() {
  return (
    <section className="panel">
      <div className="panel-header">
        <Breadcrumbs items={[{ to: '/', label: 'Accueil' }, { label: 'A propos' }]} />
      </div>
      <div className="panel-body">
        <p>
          Projet 3 : application MERN de gestion des prets de materiel IT pour un laboratoire informatique.
        </p>
      </div>
    </section>
  );
}
