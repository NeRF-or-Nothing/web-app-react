/**
 * @file PointCloudHandler.tsx
 * @desc Unused component that will handle the point cloud output from the backend (.ply file).
 */

import React from 'react';

interface PointCloudHandlerProps {
  data: ArrayBuffer;
}

const PointCloudHandler: React.FC<PointCloudHandlerProps> = ({ data }) => {
  return (
    <div>
      <p>Point Cloud Handler (Not implemented yet)</p>
      <p>Data size: {data.byteLength} bytes</p>
    </div>
  );
};

export default PointCloudHandler;