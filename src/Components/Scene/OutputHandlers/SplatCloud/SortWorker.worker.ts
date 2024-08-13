/**
 * @file SortWorker.worker.ts
 * @desc WebWorker that sorts the splats in the buffer by depth based 
 * on the viewProjectionMatrix. Receives messages from main thread and sends
 * back sorted splats. 
 */

/* eslint-disable no-restricted-globals */
/// <reference lib="WebWorker" />

// "Global" variables for the worker
export {}; // Needed to avoid ts "--isolatedModules" global script error for global variables
type viewProjectionMatrix = number[];
let viewProj: viewProjectionMatrix;
let buffer: ArrayBuffer;
let numVertex: number = 0;
const rowLength: number = 3 * 4 + 3 * 4 + 4 + 4;
let depthBuffer: BigInt64Array = new BigInt64Array(numVertex);
let lastProj: viewProjectionMatrix = [];

/**
 * Main Sort Routine, takes in a viewProjectionMatrix
 * and sorts the splats in currently stored buffer
 * @param view - viewProjectionMatrix used to sort objects by
 *  depth from camera
 */
const depthSort = (view: viewProjectionMatrix) => {
  viewProj = view;
  if (!buffer) {
    return;
  }

  numVertex = buffer.byteLength / rowLength;

  // Accessing the buffer based on types
  const fBuffer = new Float32Array(buffer);
  const uBuffer = new Uint8Array(buffer);

  // To store sorted data
  const center = new Float32Array(numVertex * 3);
  const scale = new Float32Array(numVertex * 3);
  const color = new Float32Array(numVertex * 4);
  const quat = new Float32Array(numVertex * 4);

  // Resize depthBuffer if necessary
  if (depthBuffer.length !== numVertex) {
    depthBuffer = new BigInt64Array(numVertex);
    const indexBuffer = new Uint32Array(depthBuffer.buffer);
    for (let i = 0; i < numVertex; i++) {
      indexBuffer[2 * i] = i;
    }
  }

  // Depth buffer correct, check angle between lastProj and viewProj
  else {
    let viewDifferenceDot =
      lastProj[2] * viewProj[2] +
      lastProj[6] * viewProj[6] +
      lastProj[10] * viewProj[10];
    if (Math.abs(viewDifferenceDot - 1) < 0.01)
      // Very small angle change, assume non-important change in projected
      // depths and thus no need to recompute transparency orderings
      return;
  }

  const projectedDepthBuffer = new Float32Array(depthBuffer.buffer);
  const indexBuffer = new Uint32Array(depthBuffer.buffer);

  // Iterate over each splat and compute the projected depth
  // Note: subtract depth from large value to have non-negative depth
  for (let i = 0; i < numVertex; i++) {
    let splatIdx = indexBuffer[2 * i];
    projectedDepthBuffer[2 * i + 1] =
      10000 -
      (viewProj[2] * fBuffer[8 * splatIdx + 0] +
        viewProj[6] * fBuffer[8 * splatIdx + 1] +
        viewProj[10] * fBuffer[8 * splatIdx + 2]);
  }


  // Update old view to current view
  lastProj = viewProj;

  // Sort the depth buffer
  // TODO: Figure out how to do WebGPU Bitonic sort or CPU Radix Sort
  depthBuffer.sort();

  // Reorder the splats based on the sorted depth buffer
  for (let i = 0; i < numVertex; i++) {
    let splatIdx = indexBuffer[2 * i];

    // Update Position
    center[3 * i + 0] = fBuffer[8 * splatIdx + 0];
    center[3 * i + 1] = fBuffer[8 * splatIdx + 1];
    center[3 * i + 2] = fBuffer[8 * splatIdx + 2];

    // Update Scale
    scale[3 * i + 0] = fBuffer[8 * splatIdx + 3 + 0];
    scale[3 * i + 1] = fBuffer[8 * splatIdx + 3 + 1];
    scale[3 * i + 2] = fBuffer[8 * splatIdx + 3 + 2];

    // Update Color (and normalize to [0, 1] range)
    color[4 * i + 0] = uBuffer[32 * splatIdx + 24 + 0] / 255;
    color[4 * i + 1] = uBuffer[32 * splatIdx + 24 + 1] / 255;
    color[4 * i + 2] = uBuffer[32 * splatIdx + 24 + 2] / 255;
    color[4 * i + 3] = uBuffer[32 * splatIdx + 24 + 3] / 255;

    // Update Rotations (and normalize to [-1, 1] range)
    quat[4 * i + 0] = (uBuffer[32 * splatIdx + 28 + 0] - 128) / 128;
    quat[4 * i + 1] = (uBuffer[32 * splatIdx + 28 + 1] - 128) / 128;
    quat[4 * i + 2] = (uBuffer[32 * splatIdx + 28 + 2] - 128) / 128;
    quat[4 * i + 3] = (uBuffer[32 * splatIdx + 28 + 3] - 128) / 128;
  }

  // Post the depth-sorted data back to the main thread
  self.postMessage({ center, scale, color, quat, viewProj }, [
    center.buffer,
    scale.buffer,
    color.buffer,
    quat.buffer,
  ]);
};

let sortRunning: boolean = false;
/**
 * Attempts to run depth sort as long as new viewProj is received
 */
const sortRunner = () => {
  if (!sortRunning) {
    sortRunning = true;
    const inputViewProj = viewProj;
    depthSort(inputViewProj);
    setTimeout(() => {
      sortRunning = false;
      if (inputViewProj !== viewProj) sortRunner();
    }, 0);
  }
};

/**
 * Handle incoming messages from the main thread
 */
self.onmessage = (e) => {
  if (e.data.buffer) {
    // Update Scene
    buffer = e.data.buffer.buffer;
    numVertex = e.data.numVertex;
  } else if (e.data.view) {
    // Load View
    viewProj = e.data.view;
    numVertex = e.data.numVertex;
    sortRunner();
  }
};
