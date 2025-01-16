import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Account from "../../components/Account/index.jsx";

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
