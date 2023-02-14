import React from "react";
import "./Community.css";
export default function Community(){
    return(
        <div className="mainDiv">
            <div className="topPost">
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
            </div>
        </div>
    )
}