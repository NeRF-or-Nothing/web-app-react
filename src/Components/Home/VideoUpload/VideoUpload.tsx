/**
 * @file VideoUpload.tsx 
 * @desc component that allows the user to POST a video to backend. Contains ConfigSelector component.
 */

import React, { useContext, useState } from 'react';
import { Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { POSTResponse } from '../../../Types/Responses';
import { AuthContext } from '../../../Context/AuthContext';
import ConfigSelector from './ConfigSelector';
import { BACKEND_URL } from '../../../Util/Constants';

interface VideoUploadProps {
  onUploadSuccess: (jobInfo: POSTResponse) => void;
}

/**
 * Handles file upload and configuration selection. Sends POST to /video
 * requires user to be authenticated. Decodes response json as POSTResponse
 * 
 * TODO: Probably refactor POSTResponse to something more specific
 * 
 * @param param0 - onUploadSuccess handler
 * @returns ConfigSelector component and upload button
 */
const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(AuthContext);
  const [config, setConfig] = useState<{
    trainingMode: string;
    outputTypes: string[];
    saveIterations: number[];
    sceneName: string;
  }>({
    trainingMode: 'gaussian',
    outputTypes: [],
    saveIterations: [],
    sceneName: '',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleConfigChange = (newConfig: typeof config) => {
    setConfig(newConfig);
  };

  const isConfigValid = () => {
    return (
      config.trainingMode !== '' &&
      config.outputTypes.length > 0 &&
      config.saveIterations.length > 0
    );
  };

  /**
   * 
   * @returns POST request to upload video file
   */
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('training_mode', config.trainingMode);
    formData.append('output_types', config.outputTypes.join(','));
    formData.append('save_iterations', config.saveIterations.join(','));
    formData.append('total_iterations', Math.min(Math.max(...config.saveIterations), 30000).toString());
    formData.append('scene_name', config.sceneName);

    console.log('Uploading video:', file, config);
    console.log("Scene name", formData.get('scene_name'));

    try {
      console.log("Fetching from ", `${BACKEND_URL}/video`);
      const response = await fetch(`${BACKEND_URL}/video`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      const metadataString = response.headers.get('X-Metadata');

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      if (!metadataString) {
        throw new Error('No metadata received');
      }

      const metadata = JSON.parse(metadataString);

      onUploadSuccess({
        meta: metadata,
        uuid: metadata.uuid,
        config: responseData,
      });
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" accept=".mp4" onChange={handleFileChange} />
        </Form.Group>

        {file && (
          <>
            <ConfigSelector onConfigChange={handleConfigChange} />
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={uploading || !isConfigValid()}
              className="mt-3"
            >
              {uploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          </>
        )}

        {uploading && <ProgressBar animated now={100} className="mt-3" />}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default VideoUpload;