import React from 'react';
import "./Login.css";
import logo from "./pure_logo.png";

function Login() {
  return (   
    <body>
      <div class="logo">
        <img className="nerfLogo" src={logo}/>
      </div>
      <div class="main">

        <p class="sign">
          <div >Login</div> 
          <div class="login-div"><span class="noAccount"> Don't have an account? <a href="./Signup">Sign Up</a> </span> </div>
        </p>


        <div class="space"></div>

        <div class="input-block" align="center">
          <input type="text" name="input-text" id="input-text" required spellcheck="false"/>
          <span class="placeholder">
            Username
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

export default Login;