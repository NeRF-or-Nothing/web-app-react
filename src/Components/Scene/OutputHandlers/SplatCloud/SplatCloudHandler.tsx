/**
 * @file SplatCloudHandler.tsx
 * @desc Component that handles the splat cloud output from the backend (.splat file).
 * Uses react-three-fiber and custom webgl shaders to render the splat cloud
 * in a interactive 3D scene.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Dropdown } from 'react-bootstrap';
import SplatMesh from './SplatMesh';
import {
  OrbitControls,
  MapControls,
  TrackballControls,
  ArcballControls,
  FlyControls,
  FirstPersonControls,
  CameraControls,
  Stats,
} from '@react-three/drei';

interface SplatCloudHandlerProps {
  data?: Uint8Array;
}
const controlTypes = [
  'Orbit',
  'Map',
  'Trackball',
  'Arcball',
  'Fly',
  'FirstPerson',
  'Camera',
] as const;

type ControlType = (typeof controlTypes)[number];

/**
 * Handler for interactive control type selection
 * @param controlType allows the user to switch between control methods
 * @returns
 */
const ControlsWrapper = ({ controlType }: { controlType: ControlType }) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const handleFocus = () => canvas.focus();
    canvas.addEventListener('click', handleFocus);
    return () => canvas.removeEventListener('click', handleFocus);
  }, [gl]);

  switch (controlType) {
    case 'Orbit':
      return <OrbitControls />;
    case 'Map':
      return <MapControls />;
    case 'Trackball':
      return <TrackballControls />;
    case 'Arcball':
      return <ArcballControls />;
    case 'Fly':
      return <FlyControls />;
    case 'FirstPerson':
      return <FirstPersonControls />;
    case 'Camera':
      return <CameraControls />;

    default:
      return null;
  }
};

/**
 * Main component for handling splat cloud data and passing to SplatMesh THREE.js renderer
 * @param param0 - data: Uint8Array Buffer containing the splat cloud data
 * @returns
 */
const SplatCloudHandler = ({ data }: SplatCloudHandlerProps) => {
  const [splatData, setSplatData] = useState<Uint8Array | null>(null);
  const [controlType, setControlType] = useState<ControlType>('Orbit');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setSplatData(data);
    }
  }, [data]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result instanceof ArrayBuffer) {
            setSplatData(new Uint8Array(result));
          }
        };
        reader.readAsArrayBuffer(file);
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {!splatData && (
        <input type="file" accept=".splat" onChange={handleFileUpload} />
      )}
      {splatData && (
        <>
          <Dropdown
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 1000,
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {controlType} Controls
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {controlTypes.map((type) => (
                <Dropdown.Item 
                  key={type} 
                  onClick={() => setControlType(type)}
                  active={controlType === type}
                >
                  {type} Controls
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Canvas
            className="h-100 w-100"
            gl={{ antialias: false }}
            style={{ background: 'black' }}
            camera={{ position: [0, 0, 5], fov: 75 }}
          >
            <ControlsWrapper controlType={controlType} />
            <Stats />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <group>
              <SplatMesh data={splatData} maxSplats={1000000} />
            </group>
          </Canvas>
        </>
      )}
    </div>
  );
};

export default SplatCloudHandler;
