import React,{useState} from 'react';
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
          <form class="form1">
            <input class="un " type="text" align="center" name="username" placeholder="Username"/>
            <input class="pass" type="password" align="center" nm="password" placeholder="Password"/>
            <a class="submit" align="center">Sign in</a>  
          </form>
      </div>
    </body>
  );
}

export default Login;