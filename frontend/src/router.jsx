import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import ErrorPage from './pages/404/index.jsx';
import SignIn from './pages/SignIn/index.jsx';
import UserAccounts from './pages/User/index.jsx';
import PrivateRoute from './components/PrivateRoute/index.jsx';
import { setToken, logout } from './store';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            dispatch(setToken({ token }));
        } else {
            dispatch(logout());
        }
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route
                    path="/profile"
                    element={<PrivateRoute>{<UserAccounts />}</PrivateRoute>}
                />
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default App;