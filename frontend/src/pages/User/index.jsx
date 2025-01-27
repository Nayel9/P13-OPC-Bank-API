import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Account from "../../components/Account/index.jsx";

/**
 * Composant pour afficher les comptes utilisateur.
 * @returns {JSX.Element} Le composant UserAccounts avec la barre de navigation, le contenu principal et le pied de page.
 */
const UserAccounts = () => (
  <div>
    <NavBar />
    <main className="main bg-dark bg-dark-user">
      <Account />
    </main>
    <Footer />
  </div>
);

export default UserAccounts;