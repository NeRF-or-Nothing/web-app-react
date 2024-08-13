/**
 * @file UserSceneHistory.tsx
 * @desc Component for displaying the user's scene history. Fetches previews for each scene in the history.
 * Uses pagination to display a subset of scenes at a time.
 */

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Pagination, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../../Context/AuthContext';
import { BACKEND_URL } from '../../Util/Constants';
import NavBar from '../NavbarLink/NavbarLink';
import Footer from '../Footer/Footer';

type Preview = {
  image: string;
  name: string;
};

type PreviewsState = {
  [uuid: string]: Preview | null;
};

/**
 * @returns Page with grid containing subset of users scene history
 */
const UserSceneHistory: React.FC = () => {
  const [sceneIds, setSceneIds] = useState<string[]>([]);
  const [previews, setPreviews] = useState<PreviewsState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scenesPerPage, setScenesPerPage] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Fetches the user's scene history from the backend and sets it in state.
   */
  const fetchUserHistory = useCallback(async () => {
    try {
      console.log("Fetching from ", `${BACKEND_URL}/history`);
      const response = await fetch(`${BACKEND_URL}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSceneIds(data.resources || []);
    } catch (error) {
      console.error('Error fetching user history:', error);
      setError('Failed to fetch user history. Please try again later.');
      setSceneIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserHistory();
  }, [fetchUserHistory]);

  /**
   * Fetches preview image for a single scene from the backend and sets it in state.
   * Note: Uses custom header 'X-Scene-Name' to get the scene name to allow for binary and text data.
   */
  const fetchPreview = useCallback(async (uuid: string) => {
    if (previews[uuid] !== undefined) return;

    try {
      console.log("Fetching from ", `${BACKEND_URL}/preview/${uuid}`);
      const response = await fetch(`${BACKEND_URL}/preview/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error(`Error fetching preview for ${uuid}:`, errorData);
        setPreviews(prev => ({ ...prev, [uuid]: null }));
        return;
      }

      const blob = await response.blob();
      const sceneName = response.headers.get('X-Scene-Name') || 'Unnamed Scene';
      setPreviews(prev => ({
        ...prev,
        [uuid]: { image: URL.createObjectURL(blob), name: sceneName }
      }));
    } catch (error) {
      console.error(`Error fetching preview for ${uuid}:`, error);
      setPreviews(prev => ({ ...prev, [uuid]: null }));
    }
  }, [token, previews]);

  /**
   * Fetches previews for each scene on the current page.
   */
  useEffect(() => {
    const startIndex = (currentPage - 1) * scenesPerPage;
    const endIndex = startIndex + scenesPerPage;
    const currentPageIds = sceneIds.slice(startIndex, endIndex);
  
    currentPageIds.forEach(uuid => {
      if (previews[uuid] === undefined) {
        fetchPreview(uuid);
      }
    });
  }, [sceneIds, currentPage, scenesPerPage, fetchPreview, previews]);

  const handlePreviewClick = (uuid: string, name: string) => {
    navigate(`/Scene/?uuid=${uuid}&name=${name}`);
  };

  const totalPages = Math.ceil(sceneIds.length / scenesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleScenesPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScenesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  /**
   * Generates pagination items based on the total number of pages.
   */
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  const currentScenes = sceneIds.slice((currentPage - 1) * scenesPerPage, currentPage * scenesPerPage);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container fluid className="flex-grow-1 px-0 py-0">
        <div className="bg-dark text-white py-3 px-3">
          <Container className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">User History</h2>
            <Link to="/Home">
              <Button variant="primary">Create New Scene</Button>
            </Link>
          </Container>
        </div>
        <Container className="py-4">
          {error && <Alert variant="danger">{error}</Alert>}
          {sceneIds.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Group controlId="scenesPerPage">
                  <Form.Label>Scenes per page:</Form.Label>
                  <Form.Select value={scenesPerPage} onChange={handleScenesPerPageChange}>
                    {[10, 20, 30, 40, 50].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Pagination>{paginationItems}</Pagination>
              </div>
              <Row>
                {currentScenes.map((uuid) => (
                  <Col key={uuid} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    {previews[uuid] === undefined ? (
                      <Card>
                        <Card.Body>
                          <Card.Title>Loading...</Card.Title>
                        </Card.Body>
                      </Card>
                    ) : previews[uuid] === null ? (
                      <Card>
                        <Card.Body>
                          <Card.Title>Failed to load preview</Card.Title>
                        </Card.Body>
                      </Card>
                    ) : (
                      <Card onClick={() => handlePreviewClick(uuid, previews[uuid]!.name)}>
                        <Card.Img
                          variant="top"
                          src={previews[uuid]!.image}
                          alt={previews[uuid]!.name}
                        />
                        <Card.Body>
                          <Card.Title>{previews[uuid]!.name}</Card.Title>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <Alert variant="info">No scenes found in your history.</Alert>
          )}
        </Container>
      </Container>
      <Footer />
    </div>
  );
};

export default UserSceneHistory;