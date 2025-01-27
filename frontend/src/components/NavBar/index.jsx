import { Link } from "react-router-dom";
        import logo from "../../assets/img/argentBankLogo.png";
        import "./NavBar.css";
        import { FaSignOutAlt } from "react-icons/fa";
        import { FaUserCircle } from "react-icons/fa";
        import { useSelector, useDispatch } from "react-redux";
        import { logout } from "../../store";

        /**
         * Composant pour afficher la barre de navigation.
         * @component
         * @returns {JSX.Element} Le composant NavBar.
         */
        const NavBar = () => {
          const dispatch = useDispatch();
          const firstName = useSelector((state) => state.user.firstName);
          const isLogged = useSelector((state) => state.user.isAuthenticated);

          /**
           * Gère la déconnexion de l'utilisateur.
           */
          const handleLogout = () => {
            localStorage.removeItem("token");
            dispatch(logout());
          };

          return (
            <nav className="main-nav">
              <Link className="main-nav-logo" to="/">
                <img
                  className="main-nav-logo-image"
                  src={logo}
                  alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
              </Link>
              {isLogged ? (
                <div className="main-nav-item">
                  <Link className="main-nav-user" to="/profile">
                    <FaUserCircle className="main-nav-icon" />
                    <span className="main-nav-user-name">{firstName}</span>
                  </Link>
                  <Link className="main-nav-item" onClick={handleLogout} to="/" >
                    <FaSignOutAlt className="main-nav-icon" />
                    <span className="main-nav-signout">Logout</span>
                  </Link>
                </div>
              ) : (
                <Link className="main-nav-item" to="/login">
                  <FaUserCircle className="main-nav-icon" />
                  <span className="main-nav-signin">Sign In</span>
                </Link>
              )}
            </nav>
          );
        };

        export default NavBar;