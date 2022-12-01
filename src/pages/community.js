import React from "react";
import "./style.css";

// This is the community page that is designed to host some of the best user inputs and displayed on the page,
// where other users and visitors can have a look and commont on other people's rendered objects. 

const Community = () => {
  return (
    <div>
      <div>
        <img
          src="./logo.png"
          alt="N logo"
          style={{ width: 500, height: 300 }}
        />
      </div>
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="row align-items-center my-5"> </div>
          <h1 class="font-weight-light">
            Welcome to the NerF or Nothing Community
          </h1>
          <div class="row align-items-center my-3"></div>
          <h3 class="font-weight-light">
            This is a thriving community where individuals can share their cool
            NerF renders with others in the community.
          </h3>
        </div>

        <div class="wrapper">
          <img
            src="./demo1.jpg"
            alt="N logo"
            style={{ width: 500, height: 300 }}
            hspace="50"
            vspace="60"
          />

          <p>User 1</p>

          <img
            src="./demo2.jpg"
            alt="N logo"
            style={{ width: 500, height: 300 }}
            hspace="50"
            vspace="60"
          />
          <p>User 2</p>

          <img
            src="./demo3.jpg"
            alt="N logo"
            style={{ width: 500, height: 300 }}
            hspace="50"
            vspace="60"
          />
          <p>User 3</p>

          <img
            src="./demo4.jpg"
            alt="N logo"
            style={{ width: 500, height: 300 }}
            hspace="50"
            vspace="60"
          />
          <p>User 4</p>
        </div>
      </div>
    </div>
  );
};

export default Community;
