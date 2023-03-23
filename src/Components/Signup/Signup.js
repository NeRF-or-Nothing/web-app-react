import React,{useState} from 'react';
import "./Signup.css";
import logo from "./pure_logo.png";

function Signup() {
  
  return (   
    <body>
      <div class="logo">
        <img className="nerfLogo" src={logo}/>
      </div>
      <div class="main">
        <p class="sign">
          <div>Create a New Account</div> 
          <div class="login-div"><span class="AAccount"> Already have an account? <a href="./login">Sign Up</a> </span> </div>
        </p>
          <form class="form1">
            <input class="Name " type="text" align="center" placeholder="Name"/>
            <input class="un " type="text" align="center" placeholder="Username"/>
            <input class="email " type="text" align="center" placeholder="Email"/>
            <input class="pass" type="password" align="center" placeholder="Password"/>
            <a class="submit" align="center">Sign in</a>  
          </form>
      </div>
    </body>
  );
}

export default Signup;