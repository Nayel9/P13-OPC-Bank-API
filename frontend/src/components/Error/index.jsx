import { Link } from 'react-router-dom';
import './Error.css';

/**
 * Composant pour afficher un message d'erreur 404.
 * @returns {JSX.Element} Le composant Error avec le message d'erreur et un lien vers la page d'accueil.
 */
const Error = () => {
  return (
    <div className="error-container">
        <h1 className="error-title"><span>404</span> Error</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="error-link">Go to home page</Link>
    </div>
  );
}

export default Error;