import { Link } from 'react-router-dom';
import './Error.css';

const Error = () => {
  return (
    <div className="error-container">
        <h1 className="error-title"><span>404</span> Error</h1>
        <p className="errot-message">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="error-link">Go to home page</Link>
    </div>
  );
}

export default Error;