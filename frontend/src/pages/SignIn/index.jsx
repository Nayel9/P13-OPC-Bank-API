import NavBar from '../../components/NavBar';
import LoginForm from '../../components/LoginForm';
import Footer from '../../components/Footer';

/**
 * Composant pour la page de connexion.
 * @returns {JSX.Element} Le composant SignIn avec la barre de navigation, le formulaire de connexion et le pied de page.
 */
const SignIn = () => (
    <div>
        <NavBar />
        <main className="main bg-dark">
            <LoginForm />
        </main>
        <Footer />
    </div>
);

export default SignIn;