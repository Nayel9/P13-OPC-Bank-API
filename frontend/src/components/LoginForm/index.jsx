import { useEffect, useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { setEmail, setPassword, login, setToken, setError } from "../../store";
    import { useNavigate } from "react-router-dom";
    import "./LoginForm.css";
    import { FaUserCircle } from "react-icons/fa";

    /**
     * Composant pour afficher le formulaire de connexion.
     * @component
     * @returns {JSX.Element} Le composant LoginForm.
     */
    const LoginForm = () => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const email = useSelector((state) => state.user.email);
      const password = useSelector((state) => state.user.password);
      const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
      const error = useSelector((state) => state.user.error);
      const [rememberMe, setRememberMe] = useState(false);

      // Récupère l'email ou username sauvegardé dans le localStorage si l'utilisateur a choisi "Remember me"
      useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
          dispatch(setEmail(savedEmail));
          setRememberMe(true);
        }
      }, [dispatch]);

      // Gère le changement de l'email
      const handleEmailChange = (e) => dispatch(setEmail(e.target.value));

      // Gère le changement du mot de passe
      const handlePasswordChange = (e) => dispatch(setPassword(e.target.value));

      // Gère le changement de l'état "Remember me"
      const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

      // Gère la soumission du formulaire de connexion
      const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setError(null));
        const response = await dispatch(login(email, password));

        if (response && response.token) {
          sessionStorage.setItem("authToken", response.token);
          dispatch(setToken({ token: response.token }));
        }

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
      };

      // Redirige l'utilisateur vers la page de profil s'il est authentifié
      useEffect(() => {
        if (isAuthenticated) {
          navigate("/profile");
        }
      }, [isAuthenticated, navigate]);

      // Redirige l'utilisateur vers la page 404 en cas d'erreur spécifique
      useEffect(() => {
        if (error === "error.response is undefined") {
          navigate("/404");
        }
      }, [error, navigate]);

      // Réinitialise l'erreur lors du montage et du démontage du composant
      useEffect(() => {
        dispatch(setError(null));

        return () => {
          dispatch(setError(null));
        };
      }, [dispatch]);

      return (
        <div className="sign-in-content">
          <FaUserCircle className="sign-in-icon" />
          <h1>Sign In</h1>
          {error && (
            <div className="error-message">Invalid Username or Password</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </div>
      );
    };

    export default LoginForm;