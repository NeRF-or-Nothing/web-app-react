import React, { useState } from 'react';
import './Signup.css';
import logo from './pure_logo.png';
import NavBar from "../NavbarLink/NavbarLink";
import Footer from '../Footer/Footer';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"username": username, "password": password })
      }).then((response) => response.text()).then((text) => {
        console.log(text);
        setResult(text);
      }).catch((error) => {
        console.error(error);
      });
  };

  const test = async (event) => {
    event.preventDefault();
      fetch('http://localhost:5000/test').then((response) => response.text()).then((text) => {
        console.log(text);
      }).catch((error) => {
        console.error(error);
      });
      //const data = await response.json();
      // console.log(data);
    } 

  return (
    <body>
      <NavBar/>
      <div class="logo">
        <img className="nerfLogo" src={logo}/>
      </div>
      <div class="main">
        <p class="sign">
          <div>Create a New Account</div>
          <div className="login-div">
            <span className="AAccount">
              {' '}
              Already have an account? <a href="./login">Click here</a>{' '}
            </span>{' '}
          </div>
        </p>
        <p>{result}</p>
        <form className="form1" onSubmit={handleSignup}>
          <input
            className="un "
            type="text"
            align="center"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit" align="center">
            Create account
          </button>
        </form>
      </div>
      <Footer/>
    </body>
  );
}

export default Signup;
