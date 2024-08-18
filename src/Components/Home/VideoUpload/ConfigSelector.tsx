/**
 * @file ConfigSelector.tsx
 * @desc ConfigSelector component that allows the user to select the training mode,
 *  output types, save iterations, and scene name for a new training job.
 */

import React, { useState, useEffect } from 'react';
import { Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { TrainingConfig } from '../../../Types/TrainingConfig';

const VALID_OUTPUT_TYPES = {
  gaussian: ['splat_cloud', 'point_cloud', 'video'],
  tensorf: ['model', 'video'],
};

const VALID_TRAINING_MODES = ['gaussian', 'tensorf'];

const RECOMMENDED_CONFIG: TrainingConfig = {
  trainingMode: 'gaussian',
  outputTypes: ['point_cloud', 'splat_cloud'],
  saveIterations: [7000, 30000],
  sceneName: '',
};

interface ConfigSelectorProps {
  onConfigChange: (config: TrainingConfig) => void;
}

/**
 * Component for selecting the training mode, output types, save iterations, and scene name.
 * @param onConfigChange Updates the configuration based on the user's input.
 * @returns 
 */
const ConfigSelector: React.FC<ConfigSelectorProps> = ({ onConfigChange }) => {
  const [trainingMode, setTrainingMode] = useState<string>('gaussian');
  const [outputTypes, setOutputTypes] = useState<string[]>([]);
  const [saveIterations, setSaveIterations] = useState<number[]>([]);
  const [currentIteration, setCurrentIteration] = useState<string>('');
  const [useRecommended, setUseRecommended] = useState(false);
  const [sceneName, setSceneName] = useState<string>('');

  useEffect(() => {
    updateConfig();
  }, [trainingMode, outputTypes, saveIterations, sceneName]);

  const updateConfig = () => {
    onConfigChange({ trainingMode, outputTypes, saveIterations, sceneName });
  };

  const handleTrainingModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTrainingMode(event.target.value);
    setOutputTypes([]);
  };

  const handleOutputTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const newOutputTypes = outputTypes.includes(value)
      ? outputTypes.filter((type) => type !== value)
      : [...outputTypes, value];
    setOutputTypes(newOutputTypes);
  };

  const handleSaveIterationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentIteration(event.target.value);
  };

  const handleSaveIterationAdd = () => {
    const value = parseInt(currentIteration);
    if (
      value >= 0 &&
      value <= 30000 &&
      !saveIterations.includes(value) &&
      saveIterations.length < 5
    ) {
      const newSaveIterations = [...saveIterations, value].sort(
        (a, b) => a - b
      );
      setSaveIterations(newSaveIterations);
      setCurrentIteration('');
    }
  };

  const handleRemoveIteration = (iteration: number) => {
    const newSaveIterations = saveIterations.filter((i) => i !== iteration);
    setSaveIterations(newSaveIterations);
  };

  const handleRecommendedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUseRecommended(event.target.checked);
    if (event.target.checked) {
      setTrainingMode(RECOMMENDED_CONFIG.trainingMode);
      setOutputTypes(RECOMMENDED_CONFIG.outputTypes);
      setSaveIterations(RECOMMENDED_CONFIG.saveIterations);
    } else {
      setTrainingMode('gaussian');
      setOutputTypes([]);
      setSaveIterations([]);
    }
  };

  const handleSceneNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSceneName(event.target.value);
  };

  /**
   * Renders the configuration form.
   */
  return (
    <Form.Group>
      <Form.Group controlId="useRecommended" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Use recommended configuration"
          checked={useRecommended}
          onChange={handleRecommendedChange}
        />
      </Form.Group>

      <Form.Group controlId="trainingMode" className="mb-3">
        <Form.Label>Training Mode</Form.Label>
        <Form.Select
          value={trainingMode}
          onChange={handleTrainingModeChange}
          disabled={useRecommended}
        >
          {VALID_TRAINING_MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="outputTypes" className="mb-3">
        <Form.Label>Output Types</Form.Label>
        {VALID_OUTPUT_TYPES[
          trainingMode as keyof typeof VALID_OUTPUT_TYPES
        ].map((type) => (
          <Form.Check
            key={type}
            type="checkbox"
            id={`output-${type}`}
            label={type}
            value={type}
            checked={outputTypes.includes(type)}
            onChange={handleOutputTypeChange}
            disabled={useRecommended}
          />
        ))}
      </Form.Group>

      <Form.Group controlId="saveIterations" className="mb-3">
        <Form.Label>Save Iterations (up to 5, between 0-30000)</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            min="0"
            max="30000"
            value={currentIteration}
            onChange={handleSaveIterationChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSaveIterationAdd();
              }
            }}
            disabled={useRecommended}
          />
          {/*@ts-ignore*/}
          <Button
            variant="outline-secondary"
            onClick={handleSaveIterationAdd}
            disabled={useRecommended}
          >
            Add
          </Button>
        </InputGroup>
        <div className="mt-2">
          {saveIterations.map((iteration) => (
            <Badge
              key={iteration}
              bg="primary"
              className="me-2 mb-2"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                !useRecommended && handleRemoveIteration(iteration)
              }
            >
              {iteration} {!useRecommended && <span>&times;</span>}
            </Badge>
          ))}
        </div>
      </Form.Group>

      <Form.Group controlId="sceneName" className="mb-3">
        <Form.Label>Scene Name</Form.Label>
        <Form.Control
          type="text"
          value={sceneName}
          onChange={handleSceneNameChange}
        />
      </Form.Group>
    </Form.Group>
  );
};

export default ConfigSelector;
