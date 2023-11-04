import React,{useState} from 'react';
import "./Login.css";
import logo from "./pure_logo.png";
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const signIn = async () => {
  try {
    const response = await axios.post("http://localhost:3000", {
      username,
      password,
  });

  console.log('Response from the server:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


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
            <input class="un " type="text" align="center" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input class="pass" type="password" align="center" nm="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <a class="submit" onCLick={signIn} align="center">Sign in</a>  
          </form>
      </div>
    </body>
  );
}

export default Login;
