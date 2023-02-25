import Community from "../Community/Community";
import FullRendered from "../FullRendered/FullRendered";
import Home from "../Home/Home";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import NavBar from "../NavbarLink/NavbarLink";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Footer from "../Footer/Footer"

function App(){
  return(
    <NavBar/>, 
      <Footer/>, 
     <BrowserRouter>
       <Routes>
         <Route exact path="/" element={<Home/>}></Route>
         <Route exact path="/Community" element={<Community/>}/>
         <Route exact path="/Home" element={<Home/>}/>
         <Route exact path="/Loading" element={<Loading/>}/>
         <Route exact path="/Signup" element={<Signup/>}/>
         <Route exact path="/Login" element={<Login/>}/>
         <Route exact path="/FullRendered" element={<FullRendered/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App;