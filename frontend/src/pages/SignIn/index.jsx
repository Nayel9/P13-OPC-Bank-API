import NavBar from '../../components/NavBar';
import LoginForm from '../../components/LoginForm';
import Footer from '../../components/Footer';

const SignIn = () => (
    <div>
        <NavBar />
        <main className="main bg-dark"><LoginForm /></main>
        <Footer />
    </div>
);

export default SignIn;