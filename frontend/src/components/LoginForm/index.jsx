import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, login, setToken, setError } from "../../store";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FaUserCircle } from "react-icons/fa";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      dispatch(setEmail(savedEmail));
      setRememberMe(true);
    }
  }, [dispatch]);

  const handleEmailChange = (e) => dispatch(setEmail(e.target.value));
  const handlePasswordChange = (e) => dispatch(setPassword(e.target.value));
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error === "error.response is undefined") {
      navigate("/404");
    }
  }, [error, navigate]);

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
      {error && <div className="error-message">{error}</div>}
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