import React,{useState} from "react";
import { FileUploader } from "react-drag-drop-files";
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
            <div className="topBox">
                <h3 className="nerfText">NeRF or Nothing</h3>
                <div className="topNerfPic">
                    <img className="nerfLogo" src={logo}/>
                </div>
                <h2 className="generationText">The next generation object rendering technology
                    utilizing the Neural Radiance Field technology.
                </h2>
            </div>
            <div className="yellowDiv">
                <div className="innerDiv">
                <h2>Drag a file of the video you want to be rendered
                    and watch the magic happen.
                </h2>
                <h4>*Video file must be in .mp4 or mov format.</h4>
                <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
                </div>
            </div>
        </div>
    )
}