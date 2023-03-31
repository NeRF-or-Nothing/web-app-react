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
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
            <EachPost/>
        </div>
        </div>
    )
}