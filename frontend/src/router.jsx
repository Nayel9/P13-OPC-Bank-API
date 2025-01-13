import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import ErrorPage from './pages/404/index.jsx';
import SignIn from "./pages/SignIn/index.jsx";
import UserAccounts from "./pages/User/index.jsx"; // Exemple d'une autre page

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile" element={<UserAccounts />} />
    </Routes>
  </Router>
);

export default App;