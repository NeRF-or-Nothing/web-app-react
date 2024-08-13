/**
 * @file Loading.tsx
 * @desc Unused. Loading component that displays a loading animation and text. 
 */

import "./Loading.css"
export default function Loading(){
    return(
        <div>
            <div className="loader-wrapper">
                <div className="loader">
                    
                </div>
                <h2 className="loadingText">Currently loading your render. Your position in the queue is 12.</h2>
            </div>
            
        </div>
    )
}

// TODO: Implement actual loading functionality. This is just a placeholder.