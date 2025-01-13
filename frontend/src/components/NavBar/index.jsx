import { Link } from 'react-router-dom';
import logo from '../../assets/img/argentBankLogo.png';
import './NavBar.css';
import { FaSignOutAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => (
  <nav className="main-nav">
    <Link className="main-nav-logo" to="/">
      <img
        className="main-nav-logo-image"
        src={logo}
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
      <Link className="main-nav-item" to="/login">
            <FaUserCircle className="main-nav-icon" />
          <span className="main-nav-signin" >
              Sign In
          </span>
      </Link>
  </nav>
);

export default NavBar;