import React,{useState, useEffect} from "react";
import { FileUploader } from "react-drag-drop-files";
import NavBar from "../NavbarLink/NavbarLink";
import Footer from "../Footer/Footer";
import Axios from "axios";
import "./Home.css";
import logo from "./logo.png";

const fileTypes = ["MP4"];
export default function Home(){

    const [processingStatus, setProcessingStatus] = useState("");
    const [videoName, setVideoName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [file, setFile] = useState(null);


    // use this for debugging
    // useEffect(() => {
    //   // This block will run after each render when videoUrl changes
    //   console.log(videoUrl);
    //   // You can perform additional actions here after videoUrl is updated
    // }, [videoUrl]);

    const handleChange = (file) => {
        console.log("file", file);
        setFile(file);
    };


    const receiveVideo = async (videoName) => {
      let dots = "."
      while (videoUrl == ''){
        try {
          const response = await fetch(`http://127.0.0.1:5000/nerfvideo/${videoName}`);
          if (response.ok){
            const blob = await response.blob();
            if (blob.type == "video/mp4"){
              const url = URL.createObjectURL(blob);
              setVideoUrl(String(url));
              setProcessingStatus("Done!");
              break;
            }
          }
          else {
            setProcessingStatus("Error");
          }
        } catch(error){
          console.log(error);
        }
        dots = dots == "..." ? "." : dots + ".";
        setProcessingStatus("Processing" + dots);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      
    }


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
                setVideoName(text);
                setProcessingStatus("Processing...");
                receiveVideo(text);
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
                        {videoUrl !== '' && <video controls width="400" src={videoUrl} />}
                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    )
}