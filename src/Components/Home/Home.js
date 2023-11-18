import React,{useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import NavBar from "../NavbarLink/NavbarLink";
import Footer from "../Footer/Footer";
import Axios from "axios";
import "./Home.css";
import logo from "./logo.png";

const fileTypes = ["MP4"];
export default function Home(){

    const [processingStatus, setProcessingStatus] = useState("");
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        console.log("file", file);
        setFile(file);
    };

    const sendNerfVideo = (vidid) => {
        fetch(`http://127.0.0.1:5000/nerfvideo/${vidid}`)
          .then((response) => response.text())
          .then((statusStr) => {
            console.log(statusStr);
            if (statusStr === "Video ready") {
              // Handle the case where the video is ready (e.g., display a message or perform additional actions)
            } else {
                setProcessingStatus("Processing...");
            }
          })
          .catch((error) => {
            console.error("Error fetching nerf video:", error);
          });
      };

    const uploadFile = () => {
        if (file && file[0].type !== '' && file[0].type !== 'unknown') {
          const formData = new FormData();
          formData.append('file', file[0]);
          fetch('http://127.0.0.1:5000/video', {
                method: 'POST',
                cache: 'no-cache',
                body: formData,
            }).then((response) => response.text()).then((text) => {
                console.log(text);
                sendNerfVideo(text);
        }).catch((error) => {
          console.error(error);
        });
    } else {
      console.log('File type unknown.');
    }
      };
    return(
        <div>

            <NavBar/>

            {/* start of inner div */}
            <div>

                {/* start of topBox div */}
                <div className="topBox">
                    {/* start of topNerfPic div */}
                    <div className="topNerfPic">
                        <img className="nerfLogo" src={logo}/>
                    </div>

                    <h2 className="generationText" style={{paddingBottom:"4vh"}}>The next generation object rendering technology utilizing the Neural Radiance Field technology.
                    </h2>
                </div>

                {/* start of Div */}
                <div className="greenDiv">

                    {/* start of innerDiv */}
                    <div className="innerDiv" style={{textAlign:"center"}}>

                        <h2 style={{paddingTop:"4vh"}}>Drag a file of the video you <br/> want to be rendered and watch <br/> the magic happen.
                        </h2>

                        <h4 style={{paddingTop:"3vh"}}>*Video file must be in .mp4 or mov format.</h4>
                        <FileUploader
                            multiple={true}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                            style={{margin:"auto"}}
                        />
                        <button onClick={uploadFile}>Upload Video</button>
                        <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
                        <p>{processingStatus}</p>
                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    )
}