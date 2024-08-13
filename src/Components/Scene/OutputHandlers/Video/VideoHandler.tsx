/**
 * @file VideoHandler.tsx
 * @desc Component that handles the video output from the backend (.mp4 file).
 */

import React, { useEffect, useRef } from 'react';

interface VideoHandlerProps {
  data: ArrayBuffer;
}

const VideoHandler: React.FC<VideoHandlerProps> = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      videoRef.current.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [data]);

  return (
    <div>
      <video ref={videoRef} controls style={{ maxWidth: '100%', maxHeight: '400px' }} />
    </div>
  );
};

export default VideoHandler;