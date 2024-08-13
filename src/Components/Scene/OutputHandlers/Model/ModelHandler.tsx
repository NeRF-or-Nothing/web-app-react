/**
 * @file ModelHandler.tsx
 * @desc Unused component that will handle the model output from the backend (.th tensorf file).
 */

import React from 'react';

interface ModelHandlerProps {
  data: ArrayBuffer;
}

const ModelHandler: React.FC<ModelHandlerProps> = ({ data }) => {
  return (
    <div>
      <p>Model Handler (Not implemented yet)</p>
      <p>Data size: {data.byteLength} bytes</p>
    </div>
  );
};

export default ModelHandler;