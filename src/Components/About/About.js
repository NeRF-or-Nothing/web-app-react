import React, { useState } from "react";
import exampleGif from "./example_output.gif";
import explainDiagram from "./Full_Project.png";
import colmapPic from "./colmap.png";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./About.css"
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="flex-container">
            <div className="flex-child left">
              <h1 className="jumbotron-heading">"3D rendering <br />your videos."</h1>
            </div>
            <div className="flex-child right">
              <img src="https://www.kindpng.com/picc/m/238-2380430_3d-rendering-services-logo-render-png-3d-transparent.png" />
            </div>

          </div>
          <div className="flex-container">
          <div className="flex-child left">
          <div className="techText"><h2><span class="dot blueDot"></span>Our Technology</h2></div>
          <p class="lead text-muted">NeRF consists of a website that
            receives video input from the
            user and creates a 3D fly through
            Of the object using TensorFlow
            and Colmap. This data is passed
            to our Flask server to connect
            All of our data and form a set of
            HTTP requests.   </p>
          </div>
          <div className="flex-child right">
            <img src={exampleGif}/>
          </div>
            </div>
        </div>
      </section>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png"
            alt="First slide"
          />
          <Carousel.Caption>

          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png"
            alt="Second slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://ww1.freelogovectors.net/wp-content/uploads/2018/07/tensorflow-logo.png?lossy=1&ssl=1"
            alt="Third slide"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flask_logo.svg/2560px-Flask_logo.svg.png"
            alt="Third slide"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
      <div className="techText"><h2><span class="dot aquaDot"></span>How Does It Work?</h2></div>
        <div className="miniPoints">
          <h2><span class="dot aquaDot"></span>Uploaded video gets sent to our database</h2>
          <h2><span class="dot aquaDot"></span>Flask server sends video to RabbitMQ
for video processing</h2>
          <h2><span class="dot aquaDot"></span>Video processed for 10-15 minutes</h2>
          <h2><span class="dot aquaDot"></span>Our NeRF worker receives the processed
video and creates a 3D fly object to then
be displayed on the page </h2>
        </div>
        </div>
        <img src={explainDiagram}/>
    </div>
  )

}