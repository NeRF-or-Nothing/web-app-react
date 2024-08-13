/**
 * @file JobStatus.tsx
 * @desc This component displays the job status of the current job.
 * TODO: Potentially unnecessary component. Consider removing.
 */

import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import { POSTResponse } from '../../Types/Responses';

interface JobStatusProps {
  jobInfo: POSTResponse;
}

const JobStatus: React.FC<JobStatusProps> = ({ jobInfo }) => {
  const {
    uuid,
    config: { training_mode, output_types, save_iterations, total_iterations }
  } = jobInfo;

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: '100%', maxWidth: '600px' }}>
        <Card.Header as="h3" className="text-center">
          Job Status
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Job ID:</strong> {uuid}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Training Mode:</strong> {training_mode}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Output Types:</strong>{' '}
              {Array.isArray(output_types) ? output_types.join(', ') : output_types}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Save Iterations:</strong>{' '}
              {Array.isArray(save_iterations) ? save_iterations.join(', ') : save_iterations}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Total Iterations:</strong> {total_iterations}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobStatus;