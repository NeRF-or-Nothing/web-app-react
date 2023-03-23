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
          src="https://www.billboard.com/wp-content/uploads/2020/04/eminem-press-photo-2019-aqu-billboard-1548-1587659998.jpg?w=942&h=623&crop=1"
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
          src="https://www.billboard.com/wp-content/uploads/2020/04/eminem-press-photo-2019-aqu-billboard-1548-1587659998.jpg?w=942&h=623&crop=1"
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
          src="https://www.billboard.com/wp-content/uploads/2020/04/eminem-press-photo-2019-aqu-billboard-1548-1587659998.jpg?w=942&h=623&crop=1"
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