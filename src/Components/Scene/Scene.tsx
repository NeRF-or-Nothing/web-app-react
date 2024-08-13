/**
 * @file Scene.tsx
 * @desc Page for displaying scene metadata and ResourceManager.
 */

import { useState, useEffect, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../../Context/AuthContext';
import ResourceItemManager from './ResourceItemManager';
import { fetchMetadata } from '../../Util/CommonFetch';
import NavBar from '../NavbarLink/NavbarLink';
import Footer from '../Footer/Footer';

/**
 * Component for displaying scene metadata and ResourceManager.
 */
const Scene = () => {
  const location = useLocation();
  const [metadata, setMetadata] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(AuthContext);

  const searchParams = new URLSearchParams(location.search);
  const uuid = searchParams.get('uuid') || '';
  const sceneName = searchParams.get('name') || 'Unnamed Scene';


  /**
   * Fetches scene metadata and sets it in state.
   */
  useEffect(() => {
    const fetchSceneMetadata = async () => {
      if (token) {
        try {
          const data = await fetchMetadata(uuid, token);
          setMetadata(data);
          setError(null);
        } catch (error) {
          console.error('Error fetching metadata:', error);
          setError('Failed to load scene data. Please try again later.');
        }
      }
    };

    const interval = setInterval(() => {
      if (!metadata) {
        fetchSceneMetadata();
      }
    }, 15000);

    if (!metadata) {
      fetchSceneMetadata();
    }

    return () => clearInterval(interval);
  }, [uuid, token, metadata]);

  if (!uuid) {
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
                    <Card.Title as="h2" className="mb-1 text-dark" >
                      Scene: {sceneName || 'Unnamed Scene'}
                    </Card.Title>
                    <ResourceItemManager uuid={uuid}/>
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
