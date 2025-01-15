import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, login, setToken } from '../../store';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css";
import { FaUserCircle } from "react-icons/fa";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => dispatch(setEmail(e.target.value));
  const handlePasswordChange = (e) => dispatch(setPassword(e.target.value));
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(email, password));

    if (response && response.token) {
      if (rememberMe) {
        localStorage.setItem('authToken', response.token);
      } else {
        sessionStorage.setItem('authToken', response.token);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      dispatch(setToken({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
      <div className="sign-in-content">
        <FaUserCircle className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={email} onChange={handleEmailChange} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" onChange={handleRememberMeChange} />
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
