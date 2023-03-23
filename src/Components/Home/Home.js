import React,{useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import NavBar from "../NavbarLink/NavbarLink";
import Footer from "../Footer/Footer";
import "./Home.css";
import logo from "./logo.png";
const fileTypes = ["MP4"];
export default function Home(){
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
      };
    return(
        <div>
        <NavBar/>
        <div>
            <div className="topBox">
                <h3 className="nerfText">NeRF or Nothing</h3>
                <div className="topNerfPic">
                    <img className="nerfLogo" src={logo}/>
                </div>
                <h2 className="generationText" style={{paddingBottom:"4vh"}}>The next generation object rendering technology
                    utilizing the Neural Radiance Field technology.
                </h2>
            </div>
            <div className="yellowDiv">
                <div className="innerDiv" style={{textAlign:"center"}}>
                <h2 style={{paddingTop:"4vh"}}>Drag a file of the video you <br/> want to be rendered
                    and watch <br/> the magic happen.
                </h2>
                <h4 style={{paddingTop:"3vh"}}>*Video file must be in .mp4 or mov format.</h4>
                <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        style={{margin:"auto"}}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    )
}