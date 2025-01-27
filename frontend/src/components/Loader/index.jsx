import './Loader.css';

/**
 * Composant pour afficher un indicateur de chargement.
 * @returns {JSX.Element} Le composant Loader avec une animation de chargement.
 */
const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;