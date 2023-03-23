import React from "react";
import "./EachPost.css";

export default function EachPost(){
    return(
        <div className="eachBox">
            <hr/>
            <div className="picNameUsername">
                <div className="imageSide">
                    <img src="https://pbs.twimg.com/media/EgdP6MfWAAAH0gu.jpg" className="eachPfp"/>
                </div>
                <div className="nameUsernameSide">
                    <div className="theName">
                        <h1>Bob Sugarhand</h1>
                    </div>
                    <div className="theUsername">
                        <h2>@cheeseburgerBob</h2>
                    </div>
                </div>
            </div>
            <div className="postTextImage">
                <h3>This is my render, pretty cool right!</h3>
                <img src="https://static.chaos.com/images/assets/000/011/316/full_width_original/Vision_video_1280x720.jpg?1604673750"/>
            </div>
        </div>
    )
}