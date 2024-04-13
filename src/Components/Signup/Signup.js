import React, { useState } from 'react';
import './Signup.css';
import logo from './pure_logo.png';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        <form className="form1" onSubmit={test}>
          <input
            className="un "
            type="text"
            align="center"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ////
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
    </body>
  );
}

export default Signup;
