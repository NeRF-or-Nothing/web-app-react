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


export default function Footer() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-4">
        <section className="mb-4">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-1"
            href="#!"
            role="button"
          >
            <img src={"https://cdn-icons-png.flaticon.com/512/25/25231.png"} alt="nerf-logo" style={{width:"50px",height:"50px"}} />
          </MDBBtn>

          
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        
        <a className="text-white" href="https://github.com/NeRF-or-Nothing/web-app-react">
        NeRF an RCOS Project
        </a>
      </div>
    </MDBFooter>
  );
}
