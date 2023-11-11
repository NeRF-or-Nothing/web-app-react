import React,{useState} from 'react';
import "./Signup.css";
import axios from 'axios';

import logo from "./pure_logo.png";

function Signup() {
  const[user, setUserName] = useState('');
  const[pass, setPassWord] = useState('');
  const[confirmPass, setConfirmPass] = useState('');
  const[samePass, setSamePass] = useState(false);
  const[created, setCreated] = useState(false);
  const handleUserChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassWord(event.target.value);
  };
  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
    if (pass == confirmPass)
    {
      setSamePass(true);
    }
    else{setSamePass(false);}
  };

  const submitClicked = () => {
    if (samePass){
      const data = {
        username: user,
        password: pass,
      };
      axios.post('http://localhost:5000/register', data)
      setCreated(true);
    };
  };

  return (   
    <body>
      <div class="logo">
        <img className="nerfLogo" src={logo}/>
      </div>
      {!created && (
      <div class="main">
        <p class="sign">
          <div>Create a New Account</div> 
          <div class="login-div"><span class="AAccount"> Already have an account? <a href="./login">Login</a> </span> </div>
        </p>
          <form class="form1">
            <input class="un " type="text" align="center" placeholder="Username" value={user} onChange={handleUserChange}/>
            <input class="pass" type="password" align="center" placeholder="Password" value={pass} onChange={handlePassChange}/>
            <input class="pass2" type="password" align="center" placeholder="Confirm Password" value={confirmPass} onChange={handleConfirmPassChange}/>
            <button onClick={submitClicked} class="submit" align="center">Sign in</button>  
          </form>
      </div>
      )}
    </body>
  );
}

export default Signup;
