/**
 * @file UserSceneHistory.tsx
 * @desc Component for displaying the user's scene history. Fetches previews for each scene in the history.
 * Uses pagination to display a subset of scenes at a time.
 */

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Pagination, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../../Context/AuthContext';
import { fetchUserSceneHistory, fetchSceneName, fetchSceneThumbnail } from '../../Util/CommonApiCalls';
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
 * @desc Fetches scene previews and names from the backend and displays them in a grid.
 * Clicking on a preview navigates to the scene page.
 * @returns Paginated Grid of scene previews from the user's history.
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
   * Handles fetching the user's scene history from the backend and sets it in state. 
   */
  const handleUserSceneHistory = useCallback(async () => {
    const userSceneHistory = await fetchUserSceneHistory(token ? token : '');

    setIsLoading(false);
    if (userSceneHistory !== null) {
      setSceneIds(userSceneHistory.resources);      
    } else {
      setError('Failed to fetch user history. Please try again later.');
      setSceneIds([]);
      return;
    } 

  }, [token]);

  useEffect(() => {
    handleUserSceneHistory();
  }, [handleUserSceneHistory]);

  /**
   * Handles fetching of preview image and name for a single scene from the
   * backend and sets it in state.
   */
  const handlePreview = useCallback(async (sceneID: string) => {
    // If preview is already fetched, return
    if (previews[sceneID] !== undefined) return;

    // Fetch scene name
    const sceneName = await fetchSceneName(sceneID, token ? token : '');
    if (sceneName === null) {
      setPreviews(prev => ({ ...prev, [sceneID]: null }));
      return;
    }
    
    // Fetch scene thumbnail .png
    const thumbnail = await fetchSceneThumbnail(sceneID, token ? token : '');
    if (thumbnail !== null) {
      setPreviews(prev => ({
        ...prev,
        [sceneID]: { image: URL.createObjectURL(thumbnail), name: sceneName.name }
      })); 
    } else {
      setPreviews(prev => ({ ...prev, [sceneID]: null }));
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
        handlePreview(uuid);
      }
    });
  }, [sceneIds, currentPage, scenesPerPage, handlePreview, previews]);

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
          <Alert variant="info">Loading...</Alert>
        </Container>
      </Container>
      <Footer />
    </div>
    )
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
            <Alert variant="info">No completed scenes found in your history.</Alert>
          )}
        </Container>
      </Container>
      <Footer />
    </div>
  );
};

export default UserSceneHistory;