import React, { useState } from "react";
import exampleGif from "./example_output.gif";
import explainDiagram from "./Full_Project.png";
import box from "./box.png";
import colmapPic from "./colmap.png";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import NavBar from "../NavbarLink/NavbarLink";
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
      <NavBar/>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="flex-container firstBox">
            <div className="flex-child left">
              <h1 className="jumbotron-heading">3D rendering <br />your videos made <div className="easy">easy.</div></h1>
            </div>
            <div className="flex-child right">
              <img src={box} />
            </div>

          </div>
          <div className="flex-container">
          <div className="flex-child left">
          <div className="techText"><h3><span class="dot blueDot"></span>&nbsp;&nbsp;Our Technology</h3></div>
          <p class="lead text-muted"><h3>NeRF consists of a website that
            receives video input from the
            user and creates a 3D fly through
            Of the object using TensorFlow
            and Colmap. This data is passed
            to our Flask server to connect
            All of our data and form a set of
            HTTP requests.  </h3> </p>
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
      <div className="beigeDiv">
      <div>
      <div className="techText"><h2><span class="dot aquaDot"></span>&nbsp;&nbsp;How Does It Work?</h2></div>
        <div className="miniPoints">
          <h2><span class="dot aquaDot"></span>&nbsp;&nbsp;Uploaded video gets sent to our database</h2>
          <h2><span class="dot aquaDot"></span>&nbsp;&nbsp;Flask server sends video to RabbitMQ
for video processing</h2>
          <h2><span class="dot aquaDot"></span>&nbsp;&nbsp;Video processed for 10-15 minutes</h2>
          <h2><span class="dot aquaDot"></span>&nbsp;&nbsp;Our NeRF worker receives the processed
video and creates a 3D fly object to then
be displayed on the page </h2>
        </div>
        </div>
        <img src={explainDiagram}/>

        <div>
      <div className="techText"><h2><span class="dot orangeDot"></span>&nbsp;&nbsp;Back-End Structure and Framework</h2></div>
        <div className="miniPoints">
          <h2><span class="dot orangeDot"></span>&nbsp;&nbsp;NerF is a neural network that generates 
novel views of complex 3D scenes with 2d 
images and their coordinates</h2>
          <h2><span class="dot orangeDot"></span>&nbsp;&nbsp;We take input images representing a 
scene and interpolating between them 
to render one complete scene</h2>
          <h2><span class="dot orangeDot"></span>&nbsp;&nbsp;NeRF uses a sparse set of input views to 
optimize a continuous volumetric scene 
function</h2>
          <h2><span class="dot orangeDot"></span>&nbsp;&nbsp;The result of this optimization is the ability
 to produce novel views of a complex 
scene. </h2>
        </div>
        </div>
        <img src={colmapPic}/>

        <div>
      <div className="techText"><h2><span class="dot pinkDot"></span>&nbsp;&nbsp;Webserver Structure and Framework</h2></div>
        
        <div className="miniPoints">
          <h2><span class="dot pinkDot"></span>&nbsp;&nbsp;Flask web server serves as a connection 
point that manages messages transmitting 
between the frontend and the backend</h2>
          <h2><span class="dot pinkDot"></span>&nbsp;&nbsp;MongoDB is a asynchronous messenger 
that hoses the structure for motion queue 
and NerF queue for backend video 
processing.</h2>
          <h2><span class="dot pinkDot"></span>&nbsp;&nbsp;MongoDB database servers as a place to 
hold the input videos and output fly through 
videos, as such implementation is easier for 
the frontend and backend to access the 
needed resources.</h2>
        </div>
        </div>
        </div>

    </div>
  )

}