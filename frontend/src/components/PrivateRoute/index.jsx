import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Composant pour protéger les routes privées.
 * Redirige vers la page d'accueil si l'utilisateur n'est pas authentifié.
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants à afficher si l'utilisateur est authentifié.
 * @returns {JSX.Element} Le composant PrivateRoute.
 */
const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    // Vérifie si l'utilisateur est authentifié
    return isAuthenticated ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;