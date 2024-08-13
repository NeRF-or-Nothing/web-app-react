/**
 * @file ResourceManager.tsx
 * @description This file defines the ResourceManager component which is responsible for fetching 
 * and displaying resources associated with a scene. Once the metadata is fetched, the component
 * renders a list of resources available for the scene. Upon selecting a resource, it
 * fetches the resource data and renders the appropriate handler based on the resource type.
 */

import React, { useState, useEffect, useContext } from 'react';
import { Card, ListGroup, Spinner, Alert, Badge, Container, Row, Col } from 'react-bootstrap';
import ResourceItem from './ResourceItem';
import { MetadataResponse } from '../../Types/Responses';
import { AuthContext } from '../../Context/AuthContext';
import { BACKEND_URL } from '../../Util/Constants';
import SplatCloudHandler from './OutputHandlers/SplatCloud/SplatCloudHandler';
import ModelHandler from './OutputHandlers/Model/ModelHandler';
import PointCloudHandler from './OutputHandlers/PointCloud/PointCloudHandler';
import VideoHandler from './OutputHandlers/Video/VideoHandler';

interface ResourceItemManagerProps {
  uuid: string;
}
/**
 * Allows the user to fetch and display resources associated with a scene.
 * @param uuid Scene Id
 * @returns 
 */
const ResourceItemManager = ({ uuid }: ResourceItemManagerProps) => {
  const [metadata, setMetadata] = useState<MetadataResponse | null>(null);
  const [metadataFetched, setMetadataFetched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeResource, setActiveResource] = useState<{ type: string, data: ArrayBuffer } | null>(null);
  const { token } = useContext(AuthContext);

  /**
   * Fetches metadata every 15s for the scene to display available resources.
   */
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        console.log("Fetching from ", `${BACKEND_URL}/data/metadata/${uuid}`);
        const response = await fetch(`${BACKEND_URL}/data/metadata/${uuid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        console.log('Metadata RCVD:', data);

        setMetadata(data as MetadataResponse);
        setMetadataFetched(true);
        setError(null);
      } catch (error) {
        console.error('Error fetching metadata:', error);
        setError('Failed to fetch resource metadata. Please try again later.');
      }
    };

    if (!metadataFetched) {
      fetchMetadata();
      const interval = setInterval(() => {
        if (!metadataFetched) {
          fetchMetadata();
        }
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [uuid, metadataFetched, token]);

  /**
   * Fetches the selected resource as a binary buffer, uses range requests to fetch 
   * the resource in chunks.
   * @param resourceType
   * @param iteration 
   * @returns 
   */
  const handleGetResource = async (
    resourceType: string,
    iteration: number
  ): Promise<ArrayBuffer> => {
    if (!metadata) throw new Error('Metadata not available');

    console.log('Attempting to fetch resource:', resourceType, iteration);

    const resourceInfo = metadata.resources[resourceType]?.[iteration];
    if (!resourceInfo)
      throw new Error('Resource does not exist or iteration is invalid');
    if (!resourceInfo.exists) throw new Error('Resource does not exist');

    const chunks = resourceInfo.chunks;
    const fullContent = new Uint8Array(resourceInfo.size);
    let offset = 0;

    for (let i = 0; i < chunks; i++) {
      const start = i * 1024 * 1024;
      const end =
        i === chunks - 1 ? resourceInfo.size - 1 : start + 1024 * 1024 - 1;

      console.log("Fetching from ", `${BACKEND_URL}/data/nerf/${resourceType}/${uuid}?iteration=${iteration}`);
      const response = await fetch(
        `${BACKEND_URL}/data/nerf/${resourceType}/${uuid}?iteration=${iteration}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Range: `bytes=${start}-${end}`,
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const chunk = await response.arrayBuffer();
      fullContent.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    }

    return fullContent.buffer;
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!metadata) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading resources...</p>
      </div>
    );
  }

  const handleSetActiveResource = (type: string, data: ArrayBuffer) => {
    setActiveResource({ type, data });
  };

  /**
   * Card to display resources and their respective handlers.
   */
  return (
    <Container fluid className="p-0"> 
      <Card className="border-0" style={{ width: '100%', margin: '0 auto' }}>
        <Card.Header as="h3">Resources</Card.Header>
        <Card.Body className="p-0" style={{ width: '90%', margin: '0 auto' }}>
          <Row className="g-2"> 
            {Object.entries(metadata.resources).map(([resourceType, iterations]) => (
              <Col key={resourceType} xs={12} sm={1} md={4} lg={5} xl={0}> 
                <ResourceItem
                  resourceType={resourceType}
                  iterations={Object.keys(iterations).map(Number)}
                  onGetResource={handleGetResource}
                  exists={Object.values(iterations).some((resource) => resource.exists)}
                  onSetActiveResource={handleSetActiveResource}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      {activeResource && (
        <Card className="mt-3" style={{ width: '1024px', height: '720px', margin: '0 auto' }} >
          <Card.Header as="h4">Interaction View - {activeResource.type}</Card.Header>
          <Card.Body style={{ width: '80%', height: '80%', margin: '0 auto' }}>
            <div style={{ width: '100%', height: '100%', margin: '0 auto' }}>
              {renderHandler(activeResource.type, activeResource.data)}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

/**
 * Renders the appropriate handler based on the resource type.
 * @param resourceType 
 * @param resourceData binary buffer
 * @returns 
 */
const renderHandler = (resourceType: string, resourceData: ArrayBuffer) => {
  switch (resourceType) {
    case 'splat_cloud':
      return <SplatCloudHandler data={new Uint8Array(resourceData)} />;
    case 'video':
      return <VideoHandler data={resourceData} />;
    case 'point_cloud':
      return <PointCloudHandler data={resourceData} />;
    case 'model':
      return <ModelHandler data={resourceData} />;
    default:
      return <Alert variant="warning">Unknown resource type</Alert>;
  }
};

export default ResourceItemManager;