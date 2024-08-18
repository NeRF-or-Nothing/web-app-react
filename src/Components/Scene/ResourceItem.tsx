/**
 * @file ResourceItem.tsx
 * @desc This component is a card that displays information about a resource type and allows the user to
 * download the resource and interact with it.
 */

import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { resourceTypeToExtension } from '../../Util/ResponseUtils';

interface ResourceItemProps {
  resourceType: string;
  iterations: number[];
  onGetResource: (resourceType: string, iteration: number) => Promise<ArrayBuffer>;
  exists: boolean;
  onSetActiveResource: (type: string, data: ArrayBuffer) => void;
}

/**
 * Handles interacting with a single resource.
 * @param param0 - Information about the resource type, iterations, and callbacks for 
 * fetching and interacting with the resource.
 */
const ResourceItem: React.FC<ResourceItemProps> = ({
  resourceType,
  iterations,
  onGetResource,
  exists,
  onSetActiveResource,
}) => {
  const [selectedIteration, setSelectedIteration] = useState<number>(iterations[0]);
  const [resourceData, setResourceData] = useState<ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileExtension = resourceTypeToExtension(resourceType);

  const handleGetResource = async () => {
    setIsLoading(true);
    try {
      const data = await onGetResource(resourceType, selectedIteration);
      setResourceData(data);
    } catch (err) {
      console.error('Error fetching resource:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInteract = () => {
    if (resourceData) {
      onSetActiveResource(resourceType, resourceData);
    }
  };

  return (
    <Card className="h-100">
      <Card.Header as="h5">{resourceType}</Card.Header>
      <Card.Body className="d-flex flex-columm p-2">
        <Form.Group className="mb-2 flex-grow-1">
          <Form.Label>Select Iteration</Form.Label>
          <Form.Select
            value={selectedIteration}
            onChange={(e) => setSelectedIteration(Number(e.target.value))}
            disabled={!exists || isLoading}
          >
            {iterations.map((iter) => (
              <option key={iter} value={iter}>
                Iteration {iter}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="mt-auto">
          {/*@ts-ignore*/}
          <Button 
            onClick={handleGetResource} 
            disabled={!exists || isLoading}
            variant="primary"
            className="w-100 mb-2"
          >
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              `Get Resource (${fileExtension})`
            )}
          </Button>
          <Button 
            onClick={handleInteract} 
            disabled={!exists || !resourceData || isLoading}
            variant="secondary"
            className="w-100"
          >
            Interact
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ResourceItem;