
/**
 * @file Footer.tsx
 * @desc Footer component that displays the icon and link to VidToNerf github.
 */

import { Container, Row, Col, Image } from 'react-bootstrap';

export default function Footer(): JSX.Element {
  const openGitHub = (url: string | URL | undefined) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <footer className="text-center py-3" style={{ backgroundColor: '#d9d9d9' }}>
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              style={{ height: '40px', cursor: 'pointer' }}
              onClick={() => openGitHub('https://github.com/NeRF-or-Nothing/web-app-react')}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}