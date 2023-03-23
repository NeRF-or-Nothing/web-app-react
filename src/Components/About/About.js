import React, {useState} from "react";
import exampleGif from "./example_output.gif";
import explainDiagram from "./Full_Project.png";
import colmapPic from "./colmap.png";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";

export default function About(){
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return(
        <div>
        <div id="barOne" className="barOne row">
            <div className="leftSide col-sm">
                <h1 className="threeDrenderText">
                    " 3D rendering <br/> your videos<br/> made easy. "
                </h1>
            </div>
            <div className="rightSide col-sm">
                <img className="TdRenderImg"src="https://www.kindpng.com/picc/m/238-2380430_3d-rendering-services-logo-render-png-3d-transparent.png" alt="3D Rendered"/>
            </div>
        </div>
        <div className="barTwo row">
            <div className="technologyCircleLine">
                <div className="blueCircle"></div>
                <h2>Our Technology</h2>
            </div>
            <div className="leftSideParagraph col-sm">
                <p className="leftSideText">
                NeRF consists of a website that 
                receives video input from the 
                user and creates a 3D fly through
                Of the object using TensorFlow 
                and Colmap. This data is passed 
                to our Flask server to connect 
                All of our data and form a set of 
                HTTP requests.   
                </p>
            </div>
            <div className="rightSideGif col-sm">
                <img src={exampleGif} alt="Example 3D rendered gif."/>
            </div>
        </div>
        <div className="thirdBar">
            <Carousel activeIndex={index} onSelect={handleSelect} data-bs-interval="false" className="carousel">
                <Carousel.Item>
                    <Container>
                    <Row>
                        <Col xs={{ order: 'last' }}><img alt="React Logo" className="carouselPics" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" style={{height: "5%"}}/></Col>
                        <Col xs><img className="carouselPics" alt="MongoDB Logo" src="https://w7.pngwing.com/pngs/63/19/png-transparent-mongodb-database-nosql-postgresql-mongo-text-logo-business-thumbnail.png"/></Col>
                        <Col xs><img className="carouselPics" alt="Flask Logo" src="https://cdn.freebiesupply.com/logos/large/2x/flask-logo-png-transparent.png"/></Col>
                        <Col xs={{ order: 'first' }}><img alt="TensorFlow Logo" className="carouselPics" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png"/></Col>
                    </Row>
                    </Container>
                </Carousel.Item>
                <Carousel.Item>
                    <Container>
                    <Row>
                        <Col xs={{ order: 'last' }}><img alt="Numpy Logo" className="carouselPics" src="https://seeklogo.com/images/N/numpy-logo-479C24EC79-seeklogo.com.png"/></Col>
                        <Col xs><img className="carouselPics" alt="RabbitMQ Logo" src="https://cdn.freebiesupply.com/logos/large/2x/rabbitmq-logo-png-transparent.png"/></Col>
                        <Col xs={{ order: 'first' }}><img alt="Colmap Logo" className="carouselPics" src="https://repository-images.githubusercontent.com/275164995/ed865180-cb70-11ea-87b4-04daa6718298"/></Col>
                    </Row>
                    </Container>
                </Carousel.Item>
            </Carousel>
        </div>
        <div className="fourthBar">
            <div className="blueCircle">
                <h2>How Does it Work?</h2>
            </div>
            <div className="centeredBox">
                <ul>
                    <li>Uploaded video gets sent to our database.</li>
                    <li>Flask server sends video to RabbitMQ for video processing.</li>
                    <li>Video is processed for 10-15 minutes.</li>
                    <li>Our NeRF worker recieves the processed video and creates a 3D fly object to then be displayed on the page.</li>
                </ul>
            </div>
            <img src={explainDiagram} alt="Diagram explanation"/>
        </div>
        <div className="fourthBar">
            <div className="orangeCircle">
                <h2>Back-End Structure and Framework</h2>
            </div>
            <div className="centeredBox">
                <ul>
                    <li>NerF is a neural network that generates 
novel views of complex 3D scenes with 2d 
images and their coordinates</li>
                    <li>We take input images representing a 
scene and interpolating between them 
to render one complete scene</li>
                    <li>NeRF uses a sparse set of input views to 
optimize a continuous volumetric scene 
function</li>
                    <li>The result of this optimization is the ability
 to produce novel views of a complex 
scene.</li>
                </ul>
            </div>
        </div>
        <img src={colmapPic} alt="Colmap diagram"/>
        <div className="lastBar">
            <div className="pinkCircle">
                <h2>Webserver Stucture and Framework</h2>
            </div>
            <div className="centeredBox">
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <img className="webServerLogos" id="flask" src="https://cdn.freebiesupply.com/logos/thumbs/2x/flask-logo.png"/>
                    </div>
                    <div class="col-sm">
                        <img className="webServerLogos" id="mongo" src="https://assets.stickpng.com/thumbs/58481021cef1014c0b5e494b.png"/>
                    </div>
                    <div class="col-sm">
                        <img className="webServerLogos" id="rabbit" src="https://i.pinimg.com/originals/cc/05/bf/cc05bf6e2c75b132bd41904f920747b9.png"/>
                    </div>
                </div>
                </div>
                <ul>
                    <li>Flask web server serves as a connection 
point that manages messages transmitting 
between the frontend and the backend.</li>
                    <li>MongoDB is a asynchronous messenger 
that hoses the structure for motion queue 
and NerF queue for backend video 
processing.</li>
                    <li>MongoDB database servers as a place to 
hold the input videos and output fly through 
videos, as such implementation is easier for 
the frontend and backend to access the 
needed resources.</li>
                </ul>
            </div>
        </div>
    </div>
    )
    
}