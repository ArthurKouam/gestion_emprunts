import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function NotFound() {
  return (
    <section className="panel empty-state">
      <Breadcrumbs items={[{ to: '/', label: 'Accueil' }, { label: '404' }]} />
      <p>La page demandee n'existe pas.</p>
      <Link className="button" to="/" style={{ marginTop: '1rem' }}>
        Retour a l'accueil
      </Link>
    </section>
  );
}
