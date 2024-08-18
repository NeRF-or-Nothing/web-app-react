/**
 * @file Login.tsx
 * @desc Login component that allows the user to log in to their account. Sends POST request to /login.
 */

import './Login.css';
import NavBar from '../NavbarLink/NavbarLink';
import Footer from '../Footer/Footer';
import { fetchLogin } from '../../Util/CommonApiCalls';
import { AuthContext } from '../../Context/AuthContext';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../Util/Constants';

/**
 *
 * @returns Login form with username and password fields, handlers for login form submission.
 */
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  /**
   * Handles login form submission via POST to /login. Requires HTTPS.
   * @param event Submit Button Click
   */
  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError('');

    try {
      const token = await fetchLogin(username, password);

      // Login successful
      if (token) {
        login(token, username);
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <NavBar />
      <div className="main-content">
        <div className="main">
          <div className="sign">
            <div>Login</div>
            <div className="login-div">
              <span className="noAccount">
                Don't have an account? <a href="./Signup">Sign Up</a>
              </span>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <form className="form1" onSubmit={handleLogin}>
            <input
              className="un"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="pass"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
