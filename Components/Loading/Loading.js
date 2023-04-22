import React from "react";
import "./Loading.css"
export default function Loading(){
    return(
        <div>
            <div class="loader-wrapper">
                <div class="loader">
                    
                </div>
                <h2 className="loadingText">Currently loading your render. Your position in the queue is 12.</h2>
            </div>
            
        </div>
    )
}