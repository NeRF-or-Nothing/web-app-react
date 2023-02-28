import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import logo from "../../../src/github-mark.png";

export default function App() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <div className="text-center p-2" color="#212529" />
      <MDBContainer className="p-4">
        <section className="mb-4">
          <p className="text-light" id="small-text">
            <a
              href="https://github.com/NeRF-or-Nothing/web-app-react"
              className="link-light m-3"
            >
              View our Github
            </a>
          </p>
        </section>

        <div className="text-center p-4" color="#212529" />

        <section className="">
          <MDBRow>
            <MDBCol lg="3" md="6" className="mb-3 mb-md-0">
              <p>Privacy Policy</p>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-3 mb-md-0">
              <p>Terms and Conditions</p>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-3 mb-md-0">
              <p>Cookie Policy</p>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
    </MDBFooter>
  );
}
