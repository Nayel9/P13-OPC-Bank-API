import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import ErrorPage from './pages/404/index.jsx';
import SignIn from './pages/SignIn/index.jsx';
import UserAccounts from './pages/User/index.jsx';
import PrivateRoute from './components/PrivateRoute/index.jsx';

/**
 * Composant principal de l'application qui gère les routes.
 * @returns {JSX.Element} Le composant Router avec les routes définies.
 */
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route pour la page d'accueil */}
                <Route path="/" element={<Home />} />
                {/* Route pour la page de connexion */}
                <Route path="/login" element={<SignIn />} />
                {/* Route protégée pour la page de profil utilisateur */}
                <Route
                    path="/profile"
                    element={<PrivateRoute>{<UserAccounts />}</PrivateRoute>}
                />
               {/* Route pour toutes les autres pages non définies */}
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default App;