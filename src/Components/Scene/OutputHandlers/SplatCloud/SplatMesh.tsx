/**
 * @file SplatMesh.tsx
 * @desc renders a splat cloud as a 3D scene using react-three-fiber and custom webgl shaders.
 */

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { fragmentShaderSource, vertexShaderSource } from './SplatShaders';

/* 
Buffers:
3 Float32 for Position (x, y, z) 
3 Float32 for Scale    (x', y', z')
4 Uint8   for Color    (r, g, b, alpha)
4 Uint8   for Quat     (a, b, c, d)
*/
const rowLength = 3 * 4 + 3 * 4 + 4 * 1 + 4 * 1;

/**
 * Computes focal length along x and y axis
 * @param width Viewport width
 * @param height Viewport height
 * @param fov Camera field of view
 * @param aspect Camera aspect ratio
 * @param dpr Unused performance parameter
 * @returns Vector2 with x as fx and y as fy 
 */
function FocalLength(
  width: number,
  height: number,
  fov: number,
  aspect: number,
  dpr: number
): THREE.Vector2 {
  const fovRadian = THREE.MathUtils.degToRad(fov);
  const fovXRadian = 2 * Math.atan(Math.tan(fovRadian / 2) * aspect);
  const fy = (height * dpr) / (2 * Math.tan(fovRadian / 2));
  const fx = (width * dpr) / (2 * Math.tan(fovXRadian / 2));
  return new THREE.Vector2(fx, fy);
}

interface SplatMeshProps {
  data: Uint8Array;
  maxSplats: number;
}

/**
 * Renders splats clouds as a mesh of instancedBufferGeometry's
 * @param param0 - data: Uint8Array Buffer containing the splat cloud data
 * @returns a mesh with an instancedBufferGeometry of each 
 * splat in the buffer
 */
function SplatMesh({ data, maxSplats }: SplatMeshProps) {
  // Refs
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Spin Up Worker Thread 
  const worker = useMemo(
    () => new Worker(new URL('./SortWorker.worker', import.meta.url)),
    []
  );
  const {
    size: { width, height },
    camera: { fov, aspect },
    viewport: { dpr },
  } = useThree() as any;

  // Uniforms
  const [screenUniforms] = useState({
    viewport: {
      value: new THREE.Vector2(width * dpr, height * dpr),
    },
    focal: {
      value: FocalLength(width, height, fov, aspect, dpr),
    },
  });

  // Buffer of splat data
  const [buffers, setBuffers] = useState({
    index: new Uint16Array([0, 1, 2, 2, 3, 0]),
    position: new Float32Array([1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 1, 0]),
    color: new Float32Array([1, 0, 1, 1, 1, 1, 0, 1]),
    quat: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1]),
    scale: new Float32Array([1, 1, 1, 2, 0.5, 0.5]),
    center: new Float32Array([0, 0, 0, 2, 0, 0]),
  });

  // State for new data received
  const [newDataReceived, setNewDataReceived] = useState(true);

  // Update uniforms on viewport change
  useEffect(() => {
    const updateUniforms = () => {
      screenUniforms.focal.value = FocalLength(width, height, fov, aspect, dpr);
      screenUniforms.viewport.value = new THREE.Vector2(
        width * dpr,
        height * dpr
      );
    };
    updateUniforms();
  }, [width, height, fov, aspect, dpr]);

  // Post message of new data to worker thread
  useEffect(() => {
    if (newDataReceived) {
      worker.postMessage({
        buffer: data,
        numVertex: Math.floor(data.length / rowLength),
      });
      setNewDataReceived(false);
    }
  }, [data, worker, newDataReceived]);

  useEffect(() => {
    setNewDataReceived(true);
  }, [data]);

  // Update buffers on each frame, and post message to worker thread with viewProj
  useFrame((state) => {
    const mesh = meshRef.current;
    if (mesh == null) return;

    const camera = state.camera;
    const viewProj = new THREE.Matrix4()
      .multiply(camera.projectionMatrix)
      .multiply(camera.matrixWorldInverse)
      .multiply(mesh.matrixWorld);
    worker.postMessage({
      view: Array.from(viewProj.elements),
      numVertex: buffers.center.length / 3,
    });
  });

  // Update buffers on message from worker thread
  useEffect(() => {
    worker.onmessage = (e: {
      data: { quat: any; scale: any; center: any; color: any };
    }) => {
      const { quat, scale, center, color } = e.data;
      setBuffers((buffers) => ({ ...buffers, center, scale, color, quat }));
    };
    return () => {
      worker.onmessage = null;
    };
  });

  // Update buffer attributes
  const update = useCallback(
    (self: THREE.InstancedBufferAttribute | THREE.BufferAttribute) => {
      self.needsUpdate = true;
    },
    []
  );

  const instanceCount = Math.min(buffers.center.length / 3, maxSplats);

  return (
    <mesh ref={meshRef} renderOrder={10} rotation={[Math.PI, 0, 0]}>
      <instancedBufferGeometry
        key={instanceCount}
        instanceCount={instanceCount}
      >
        <bufferAttribute
          attach="index"
          onUpdate={update}
          array={buffers.index}
          itemSize={1}
          count={6}
        />
        <bufferAttribute
          attach="attributes-position"
          onUpdate={update}
          array={buffers.position}
          itemSize={3}
          count={4}
        />
        <instancedBufferAttribute
          attach="attributes-color"
          onUpdate={update}
          array={buffers.color}
          itemSize={4}
          count={instanceCount}
        />
        <instancedBufferAttribute
          attach="attributes-quat"
          onUpdate={update}
          array={buffers.quat}
          itemSize={4}
          count={instanceCount}
        />
        <instancedBufferAttribute
          attach="attributes-scale"
          onUpdate={update}
          array={buffers.scale}
          itemSize={3}
          count={instanceCount}
        />
        <instancedBufferAttribute
          attach="attributes-center"
          onUpdate={update}
          array={buffers.center}
          itemSize={3}
          count={instanceCount}
        />
      </instancedBufferGeometry>
      <rawShaderMaterial
        uniforms={screenUniforms}
        fragmentShader={fragmentShaderSource}
        vertexShader={vertexShaderSource}
        depthTest={true}
        depthWrite={false}
        transparent={true}
      />
    </mesh>
  );
}

export default SplatMesh;
