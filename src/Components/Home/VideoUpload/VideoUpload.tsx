/**
 * @file VideoUpload.tsx 
 * @desc component that allows the user to POST a video to backend. Contains ConfigSelector component.
 */

import React, { useContext, useState } from 'react';
import { Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { MetadataResponse } from '../../../Types/Responses';
import { AuthContext } from '../../../Context/AuthContext';
import { fetchPostVideo } from '../../../Util/CommonApiCalls';
import ConfigSelector from './ConfigSelector';
import { TrainingConfig } from '../../../Types/TrainingConfig';

interface VideoUploadProps {
  onUploadSuccess: (data: MetadataResponse) => void;
}



const VideoUpload: React.FC<VideoUploadProps> = ({ onUploadSuccess }) => {

  /**
   * State variables to store video file, upload status, training config, 
   * auth token, and error message.
   */
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<TrainingConfig>({
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
   * @desc POSTs video file and config to backend for processing.
   * @returns void
   */
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const metadata = await fetchPostVideo(
      file,
      config,
      token ? token : ''
    );
    
    if (metadata !== null) {
      onUploadSuccess(metadata);
    } else {
      setError('Upload failed');
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
            {/* @ts-ignore */}
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