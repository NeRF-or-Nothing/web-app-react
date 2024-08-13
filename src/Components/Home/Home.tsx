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
import JobStatus from './JobStatus';
import { POSTResponse } from '../../Types/Responses';
import { AuthContext } from '../../Context/AuthContext';
import { fetchMetadata } from '../../Util/CommonFetch';
import { MetadataResponse } from '../../Types/Responses';

const Home: React.FC = () => {
  /**
   * State variables to store job information and status,
   * authentication token, and navigation to the scene to a different route.
   */
  const [jobInfo, setJobInfo] = useState<POSTResponse | null>(null);
  const [jobFinished, setJobFinished] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Effect hook to check the status of the job every 15 seconds while not completed.
   */
  useEffect(() => {
    const interval = setInterval(async () => {
      if (jobInfo) {
        const metadata: MetadataResponse = await fetchMetadata(
          jobInfo.uuid,
          token ? token : ''
        );
        if (metadata) {
          const isJobFinished = Object.values(metadata.resources).some(
            (resource) =>
              Object.values(resource).some((iteration) => iteration.exists)
          );
          setJobFinished(isJobFinished);
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [jobInfo, token]);

  const handleUploadSuccess = (newJobInfo: POSTResponse) => {
    setJobInfo(newJobInfo);
  };

  const handleGoToHistory = () => {
    navigate('/History');
  };

  /**
   * Render the home page with the video upload form and job status component.
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
                {jobInfo && (
                  <>
                    <JobStatus jobInfo={jobInfo} />
                    {jobFinished && (
                      //@ts-ignore
                      <Button
                        variant="primary"
                        onClick={handleGoToHistory}
                        className="mx-auto d-block mt-3"
                      >
                        Go to History
                      </Button>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
