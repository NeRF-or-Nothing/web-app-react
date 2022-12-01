import React from "react";
import button from "react-bootstrap/Button";
import { input } from "react-bootstrap";

// this page includes the content of the landing page, which includes a logo of the project, a selector
// that selects a file from the user's local repository, and a button that currently don't have any actions
// prorams, but it's used to submitt the user input to the backend.

const Home = () => {
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
          <h1 class="font-weight-light">NeRF or Nothing</h1>
          <div class="row align-items-center my-3"></div>
          <h3 class="font-weight-light">
            {" "}
            The next generation object rendering technology utilizing the Neural
            Radiance Field technology.{" "}
          </h3>
          <div class="row align-items-center my-3"></div>
          <div class="input-group">
            <div class="input-group-prepend"></div>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
              <label class="custom-file-label" for="inputGroupFile01">
                Choose file
              </label>
            </div>
          </div>
          <button type="button" class="btn btn-success">
            Submit Video
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
