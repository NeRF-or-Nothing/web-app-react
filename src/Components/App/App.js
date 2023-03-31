import Community from "../Community/Community";
import FullRendered from "../FullRendered/FullRendered";
import Home from "../Home/Home";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import About from "../About/About";
import {BrowserRouter,Route,Routes} from "react-router-dom";

function App(){
  return(
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/Community" element={<Community/>}/>
        <Route exact path="/Home" element={<Home/>}/>
        <Route exact path="/Loading" element={<Loading/>}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/About" element={<About/>}/>
        <Route exact path="/FullRendered" element={<FullRendered/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App;