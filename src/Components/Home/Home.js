import React from "react";
import logo from "../logo.png";
export default function Home(){
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
                <h2>Drag a file of the video you want to be rendered
                    and watch the magic happen.
                </h2>
                <h4>*Video file must be in .mp4 or mov format.</h4>
            </div>
        </div>
    )
}