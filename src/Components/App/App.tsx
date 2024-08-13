/**
 * The main component of the application.
 * Renders the different routes based on the URL path.
 *
 * @returns The rendered application component.
 */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Loading from '../Loading/Loading';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import History from '../User/UserSceneHistory';
import Scene from '../Scene/Scene';
import UploadASplatScene from '../Scene/UploadASplatScene/UploadASplatScene';
import FullRendered from '../FullRendered/FullRendered';
import Community from '../Community/Community';
import { AuthProvider } from '../../Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Home" element={<Home />} />
          <Route path="/Loading" element={<Loading />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/History" element={<History/>} />
          <Route path="/Scene" element={<Scene />} />
          <Route path="/Scene/UploadASplatScene" element={<UploadASplatScene />} />
          {/* <Route path="/Community" element={<Community />} /> */}
          {/* <Route path="/FullRendered" element={<FullRendered />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
