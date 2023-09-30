import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import logo from "../../../src/github-mark.png";

export default function Footer() {
  const openGitHub = (url) =>{
    window.open(url, "_blank", "noreferrer");
  };
  return (

    <MDBFooter className="text-center" color="white" bgColor="dark">

      <MDBContainer className="p-4">

        <section className="mb-4">


          <img className = "gitImage" onClick = {() => openGitHub("https://github.com/NeRF-or-Nothing/web-app-react")} src={"https://cdn-icons-png.flaticon.com/512/25/25231.png"} />

          {/* <a
            href="https://github.com/NeRF-or-Nothing/web-app-react"
            className="link-dark m-3"
          >
            <p className="text-light">View our Github</p>
          </a> */}
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}
