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
          <div >Create a new account</div> 
          <div class="login-div"><span class="noAccount"> Already have an account? <a href="./Login">Log in</a></span> </div>
        </p>

        <div class="input-block" align="center">
          <input type="text" name="input-text" id="input-text" required spellcheck="false"/>
          <span class="placeholder">
            Name
          </span>
        </div>

        <div class="space"></div>

        <div class="input-block" align="center">
          <input type="text" name="input-text" id="input-text" required spellcheck="false"/>
          <span class="placeholder">
            Username
          </span>
        </div>

        <div class="space"></div>

        <div class="input-block" align="center">
          <input type="text" name="input-text" id="input-text" required spellcheck="false"/>
          <span class="placeholder">
            Email
          </span>
        </div>

        <div class="space"></div>

        <div class="input-block" align="center">
          <input type="password" name="input-text" id="input-text" required spellcheck="false"/>
          <span class="placeholder">
            Password
          </span>
        </div>
        
        <div class="space"></div>
        <a class="submit" href="/">Sign in</a>
      </div>
    </body>
  );
}

export default Signup;