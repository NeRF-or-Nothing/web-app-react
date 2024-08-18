/**
 * @file Signup.tsx
 * @desc Component for the signup page. POSTS HTTPS /register to create a new account.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../Util/CommonApiCalls';
import logo from '../../Assets/pure_logo.png';
import NavBar from '../NavbarLink/NavbarLink';
import Footer from '../Footer/Footer';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  /**
   * Handles signup form submission via POST to /register. Requires HTTPS.
   * @param event Submit Button Click
   */
  const handleSignup = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const success = await fetchRegister(username, password);

    if (success) {
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <NavBar />
      <div className="main-content">
        <div className="main">
          <div className="sign">
            <div>Create a New Account</div>
            <div className="login-div">
              <span className="AAccount">
                Already have an account? <a href="./login">Click here</a>
              </span>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <form className="form1" onSubmit={handleSignup}>
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
              Create account
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
