/**
 * @file Home.tsx
 * @desc This component is the main page of the application. It contains the video upload and
 * job status components. Users must log in before uploading a video.
 */

import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import NavBar from '../NavbarLink/NavbarLink';
import Footer from '../Footer/Footer';
import VideoUpload from './VideoUpload/VideoUpload';
import { MetadataResponse, SceneMetadataResponse } from '../../Types/Responses';
import { AuthContext } from '../../Context/AuthContext';
import { fetchSceneMetadata } from '../../Util/CommonApiCalls';

/**
 * 
 * @returns Home page with video upload form and job status component.
 * Allows option to navigate to scene/history page if resources are generated.
 */
const Home: React.FC = () => {
  /**
   * State variables to store job information and status,
   * authentication token, and navigation to the scene.
   */
  const [jobInfo, setJobInfo] = useState<MetadataResponse | null>(null);
  const [resourceGenerated, setResourceGenerated] = useState(false);
  const [sceneId, setSceneId] = useState<string | null>(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Effect hook to check the status of the job every 15 seconds while not completed.
   */
  useEffect(() => {
    const interval = setInterval(async () => {
      if (jobInfo) {
        const sceneMetadata = await fetchSceneMetadata(
          jobInfo.id,
          token ? token : ''
        );

        // Check if any resources have been generated
        if (sceneMetadata !== null) {
          const isResourceGenerated = Object.values(sceneMetadata.resources).some(
            (resource) =>
              Object.values(resource).some((iteration) => iteration.exists)
          );
          setResourceGenerated(isResourceGenerated);
          setSceneId(sceneMetadata.meta.id);
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [jobInfo, token]);

  const handleUploadSuccess = (newJobInfo: MetadataResponse) => {
    setJobInfo(newJobInfo);
  };

  const handleGoToHistory = () => {
    navigate('/History');
  };

  const handleGoToScene = () => {
    if (sceneId) {
      navigate(`/Scene?scene_id=${sceneId}`);
    }
  };

  /**
   * Render the home page with the video upload form and job status component.
   * Navigate to scene/history page if resources are generated.
   */
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1 d-flex flex-column mx-0 px-0">
        <div className="bg-dark py-2 mx-0">
          <h2 className="text-center ">
            Next generation interactive scene reconstruction powered by Deep
            Learning
          </h2>
        </div>
        <div className="bg-success flex-grow-1 d-flex align-items-top mx-0">
          <Container>
            <Row>
              <Col md={8} className="mx-auto">
                <h3 className="text-center text-white mb-2">
                  Select a video file that you want reconstructed and watch the
                  magic happen.
                </h3>
                <p className="text-center text-white mb-3">
                  *Video file must be in .mp4 format. <br />
                  *TensoRF is no longer accepting new video uploads.
                </p>
                <VideoUpload onUploadSuccess={handleUploadSuccess} />
              </Col>
            </Row>
            {jobInfo && (
              <Row className="mt-3">
                <Col md={8} className="mx-auto">
                  <div className="bg-light p-3 rounded">
                    <h4 className="text-center">Job Information</h4>
                    <p className="text-center">Job ID: {jobInfo.id}</p>
                  </div>
                </Col>
              </Row>
            )}
            {resourceGenerated && (
              <Row className="mt-3">
                <Col md={8} className="mx-auto d-flex justify-content-center">
                  {/*@ts-ignore*/}
                  <Button onClick={handleGoToHistory} className="me-2">
                    Go to History
                  </Button>
                  <Button onClick={handleGoToScene}>
                    Go to Scene
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;