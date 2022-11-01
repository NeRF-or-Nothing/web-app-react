import React from "react";
  
const About = () => {
  return (
    <div>
      <div class="container">
      <div class="row align-items-center my-5">
      <h1 class="font-weight-light">About NerF Technology</h1>

      <div class="row align-items-center my-3"></div>
      <div class="row align-items-center my-3"></div>

      <h3>General Overview</h3>

      <h>
      In general, the project consists of the frontend website that takes the
    input video from user, a backend server that is implemented with TensorF and
    Colmap that process the video and creates the 3D fly through of the object,
    and a web server that is builded with flask that serves as a database to
    connect and pass through data between the frontend and backend. Lastly, the
    connections between all the branches will the a set of HTTP requests.
      </h>

      <div class="row align-items-center my-3"></div>

      <h>
      In the beginning, The user uploads a video to the frontend website, that
    video will then be send to the Web server, more specifically the MongoDB
    database. Then, the Flask web server will send the input video to RabbitMQ,
    which is an asynchronies messenger that hosts two of the queue for
    processing the video. The video will first be send to the structure for
    motion queue and ready for the structure for motion worker to process the
    worker to process the video, which will take approximately 10 -15 minutes.
    Then, the video and the process data will be send out of the SFM queue, and
    goes into the NerF queue and ready for the NerF worker to process. When the
    3d fly through object is created with the NerF worker, the 3D fly through
    object will be send out of the RabbitMQ, and back to Web server, sorted in
    the MongoDB database ready for the Front-end VueJS to access, and displayed
    in the page.
      </h>
      </div>
      </div>
    </div>
  );
};
  
export default About;