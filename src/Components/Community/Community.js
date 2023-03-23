import React from "react";
import "./Community.css";
import NavBar from "../NavbarLink/NavbarLink";
import EachPost from "../EachPost/EachPost";
export default function Community(){
    return(
        <div>
            <NavBar/>
        <div className="mainDiv">
            <EachPost/>
            {/* <div className="topPost">
                <div className="topRow">
                    <img src="https://pbs.twimg.com/media/EgdP6MfWAAAH0gu.jpg" className="yourProfilePic"/>
                    <div className="largeBorderBox">
                        <h2>Talk about your render here!</h2>
                    </div>
                </div>
                <div className="bottomRow">
                    <div className="photoBox">
                        <h2>Photo</h2>
                    </div>
                    <div className="videoBox">
                        <h2>Video</h2>
                    </div>
                </div>
            </div> */}
        </div>
        </div>
    )
}