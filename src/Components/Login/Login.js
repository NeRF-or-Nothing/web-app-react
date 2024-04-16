import React,{useState} from 'react';
import "./Login.css";
import logo from "./pure_logo.png";
import NavBar from "../NavbarLink/NavbarLink";
import Footer from '../Footer/Footer';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
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


  return (   
    <body>
      <NavBar/>
      <div class="logo">
        <img className="nerfLogo" src={logo}/>
      </div>
      <div class="main">
        <p class="sign">
          <div >Login</div> 
          <div class="login-div"><span class="noAccount"> Don't have an account? <a href="./Signup">Sign Up</a> </span> </div>
        </p>  
        <p>{result}</p>
          <form class="form1" onSubmit={handleLogin}>
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
            Log in
          </button>  
          </form>
      </div>
      <Footer/>
    </body>
  );
}

export default Login;