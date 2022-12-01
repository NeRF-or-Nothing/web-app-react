import React from "react";


// This is the about page that described all the information for the project, informing the user of what the project is. 

const About = () => {
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
          <h1 class="font-weight-light">About NerF Technology</h1>

          <div class="row align-items-center my-3"></div>
          <div class="row align-items-center my-3"></div>

          <h3>General Overview</h3>

          <h5>
            In general, the project consists of the frontend website that takes
            the input video from user, a backend server that is implemented with
            TensorF and Colmap that process the video and creates the 3D fly
            through of the object, and a web server that is builded with flask
            that serves as a database to connect and pass through data between
            the frontend and backend. Lastly, the connections between all the
            branches will the a set of HTTP requests.
          </h5>

          <div class="row align-items-center my-3"></div>

          <div>
            <h5>
              In the beginning, The user uploads a video to the frontend
              website, that video will then be send to the Web server, more
              specifically the MongoDB database. Then, the Flask web server will
              send the input video to RabbitMQ, which is an asynchronies
              messenger that hosts two of the queue for processing the video.
              The video will first be send to the structure for motion queue and
              ready for the structure for motion worker to process the worker to
              process the video, which will take approximately 10 -15 minutes.
              Then, the video and the process data will be send out of the SFM
              queue, and goes into the NerF queue and ready for the NerF worker
              to process. When the 3d fly through object is created with the
              NerF worker, the 3D fly through object will be send out of the
              RabbitMQ, and back to Web server, sorted in the MongoDB database
              ready for the Front-end VueJS to access, and displayed in the
              page.
            </h5>

            <div>
              <img
                src="./example_output.gif"
                alt="N logo"
                style={{ width: 800, height: 600 }}
                padding="30px"
              />

              <img
                src="./full_project.png"
                alt="N logo"
                style={{ width: 800, height: 600 }}
                padding="30px"
              />
            </div>
          </div>

          <div class="row align-items-center my-3"></div>
          <div class="row align-items-center my-3"></div>

          <h3>Back-end Structure and Framwork</h3>

          <h4>
            NerF Technology via Colmap and Structure for motion and implemented
            by TencerRF
          </h4>

          <h5>
            In a general, NerF is a neural network that generates novel views of
            complex 3D scenes with 2d images and their coordinates. It works by
            taking input images representing a scene and interpolating between
            them to render one complete scene. A NeRF uses a sparse set of input
            views to optimize a continuous volumetric scene function. The result
            of this optimization is the ability to produce novel views of a
            complex scene.
          </h5>

          <div>
            <img
              src="./colmap.png"
              alt="N logo"
              style={{ width: 800, height: 300 }}
              padding="30px"
            />
          </div>

          <div class="row align-items-center my-3"></div>
          <div class="row align-items-center my-3"></div>

          <h3>Webserver Structure and Framwork</h3>

          <h4>Flask with Mongdb and Rabbitmq</h4>

          <h5>
            There are three components that makes up the web server branch,
            Flask web server, MongoDB database. First, the Flask web server
            serves as a connection point that manages messages transmitting
            between the frontend and the backend, such as when the backend is
            processing the video in the Structure for motion queue, the flask
            web server will constantly get information about the time remaining
            for completion and feet that to the frontend to let the users know
            the time remaining.
          </h5>
          <div class="row align-items-center my-3"></div>
          <h5>
            Second, MongoDB is a asynchronous messenger that hoses the structure
            for motion queue and NerF queue for backend video processing; it’s
            used to manage the input video is first send to the SFM queue for
            processing, and when it’s done, it’s send to the NerF queue for
            further processing.
          </h5>
          <div class="row align-items-center my-3"></div>
          <h5>
            Lastly, the MongoDB database servers as a place to hold the input
            videos and output fly through videos, as such implementation is
            easier for the frontend and backend to access the needed resources.
          </h5>

          <div>
            <img
              src="./mogo.svg"
              alt="N logo"
              style={{ width: 400, height: 150 }}
              padding="30px"
            />
          </div>

          <div class="row align-items-center my-3"></div>
          <div class="row align-items-center my-3"></div>

          <h3>Front-end Structure and Framwork</h3>

          <h4>React.js & Bootstrap</h4>

          <h5>
            The app is currently builded with React.js with the Bootstrap
            plugin.
          </h5>

          <div>
            <img
              src="./bootstrap.jpg"
              alt="N logo"
              style={{ width: 400, height: 180 }}
              padding="30px"
            />
            <img
              src="./logo192.png"
              alt="N logo"
              style={{ width: 180, height: 180 }}
              padding="30px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
