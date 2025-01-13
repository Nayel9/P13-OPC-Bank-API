import NavBar from '../../components/NavBar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Footer from '../../components/Footer';

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