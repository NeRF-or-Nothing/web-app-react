import React, { useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./FullRendered.css";
import NavBar from "../NavbarLink/NavbarLink";
// import 
// import ReactBootstrapCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.min.css";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
export default function FullRendered(){
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  //
  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    console.log(`Clicked at (${x}, ${y})`);
  };
  return (
    <div>
    <NavBar/>
    <Carousel activeIndex={index} onSelect={handleSelect} data-bs-interval="false" className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/5120x2880-dark-blue-solid-color-background.jpg/2560px-5120x2880-dark-blue-solid-color-background.jpg"
          alt="First slide"
          onClick={handleClick}
        />
        <Carousel.Caption>
          <p>Click the center of this image.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.umdchabad.org/new/wp-content/uploads/2018/08/1280x720-coral-pink-solid-color-background-768x432.jpg"
          alt="Second slide"
          onClick={handleClick}
        />

        <Carousel.Caption>
          <p>Click the center of this image.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://st2.depositphotos.com/33190558/47628/i/450/depositphotos_476287700-stock-photo-purple-solid-color-background-plain.jpg"
          alt="Third slide"
          onClick={handleClick}
        />

        <Carousel.Caption>
          <p>Click the center of this image.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}