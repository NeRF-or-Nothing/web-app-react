/**
 * @file Scene.tsx
 * @desc Page for displaying scene metadata and ResourceManager.
 */

import { useState, useEffect, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../../Context/AuthContext';
import ResourceItemManager from './ResourceItemManager';
import { fetchSceneMetadata } from '../../Util/CommonApiCalls';
import NavBar from '../NavbarLink/NavbarLink';
import Footer from '../Footer/Footer';
import { SceneMetadataResponse } from '../../Types/Responses';

/**
 * Component for displaying scene metadata and ResourceManager.
 */
const Scene = () => {
  const location = useLocation();
  const [metadata, setMetadata] = useState<SceneMetadataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(AuthContext);
  const searchParams = new URLSearchParams(location.search);
  const sceneID = searchParams.get('scene_id') || '';
  const sceneName = searchParams.get('name') || 'Unnamed Scene';

  /**
   * Attempts to fetch scene metadata every 15s until successful.
   * Sets metadata state if successful.
   */
  useEffect(() => {
    const handleFetchSceneMetadata = async () => {
      try {
        const metadata: SceneMetadataResponse = await fetchSceneMetadata(
          sceneID,
          token ? token : ''
        );

        if (metadata) {
          setMetadata(metadata);
        }
      } catch (error) {
        console.error(`Error fetching job data for ${sceneID}:`, error);
        setError('Failed to load scene data. Please try again later.');
      }
    };

    const interval = setInterval(() => {
      if (!metadata) {
        handleFetchSceneMetadata();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [sceneID, token, metadata]);

  if (!sceneID) {
    return <Navigate to="/" replace />;
  }

  /**
   * Renders Scene name and ResourceManager component.
   */
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container fluid className="flex-grow-1 py-0">
        <Row className="justify-content-center">
          <Col xs={0} md={0} lg={0}>
            <Card>
              <Card.Body style={{ width: '100%', margin: '0 auto' }}>
                {error && <Alert variant="danger">{error}</Alert>}
                {!metadata ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-3">Loading scene data...</p>
                  </div>
                ) : (
                  <div>
                    <Card.Title as="h2" className="mb-1 text-dark">
                      Scene: {sceneName || 'Unnamed Scene'}
                    </Card.Title>
                    <ResourceItemManager sceneID={sceneID} />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Scene;
