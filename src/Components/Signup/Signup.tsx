/**
 * @file Signup.tsx
 * @desc Component for the signup page. POSTS HTTPS /register to create a new account.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/pure_logo.png';
import NavBar from "../NavbarLink/NavbarLink";
import Footer from '../Footer/Footer';
import './Signup.css';
import { BACKEND_URL } from '../../Util/Constants';

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
  const handleSignup = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      console.log("Fetching from ", `${BACKEND_URL}/register`);
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username,
          password: password
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('response:', response);
  
      const data = await response.json();
      const metadataString = response.headers.get('X-Metadata');

      if (!response.ok || !metadataString) {
        throw new Error(data.message || 'Registration failed');
      }

      const metadata = JSON.parse(metadataString);

      if (metadata.status === 'ERROR') {
        throw new Error(metadata.message);
      }

      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <body>
      <NavBar/>
      <div className="logo">
        <img className="nerfLogo" src={logo} alt="NeRF Logo"/>
      </div>
      <div className="main">
        <p className="sign">
          <div>Create a New Account</div>
          <div className="login-div">
            <span className="AAccount">
              Already have an account? <a href="./login">Click here</a>
            </span>
          </div>
        </p>
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
      <Footer/>
    </body>
  );
}

export default Signup;