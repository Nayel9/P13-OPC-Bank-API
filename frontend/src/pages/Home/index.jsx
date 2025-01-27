import NavBar from '../../components/NavBar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Footer from '../../components/Footer';

/**
 * Composant pour la page d'accueil.
 * @returns {JSX.Element} Le composant Home avec la barre de navigation, le contenu principal et le pied de page.
 */
const Home = () => (
  <div>
    <NavBar />
    <main>
      <Hero />
      <Features />
    </main>
    <Footer />
  </div>
);

export default Home;