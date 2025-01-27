import NavBar from '../../components/NavBar';
import Error from '../../components/Error';
import Footer from '../../components/Footer';

/**
 * Composant pour la page d'erreur 404.
 * @returns {JSX.Element} Le composant ErrorPage avec la barre de navigation, le message d'erreur et le pied de page.
 */
const ErrorPage = () => (
    <div>
        <NavBar />
        <Error />
        <Footer />
    </div>
);

export default ErrorPage;