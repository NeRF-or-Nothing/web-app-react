/**
 * @file Responses.ts
 * @desc This file contains type declarations for decoding api responses from the backend.
 */

/**
 * JSON structure of metadata any "resource associated" response from the backend.
 * (i.e, not /login or /register)
 */
export interface MetadataResponse {
    id: string;
    error: string;
    message: string;
}

/**
 * JSON structure of scene metadata response from the backend.
 * Contains request metadata and information about the scene's resources.
 * Particularly, the resources field contains information about the scene's output types,
 * iterations, and the existence and size of the resources.
 */
export interface SceneMetadataResponse {
  meta : MetadataResponse
  resources: {
    [outputType: string]: {
      [iteration: string]: {
        exists: boolean;
        size: number;
        chunks: number;
        last_chunk_size: number;
      };
    };
  };
}

/**
 * JSON structure of user history response from the backend.
 * Contains request metadata and list of scene ids.
 */
export interface UserSceneHistoryResponse {
  meta: MetadataResponse;
  resources: string[];
}

/**
 * JSON structure of scene name response from the backend.
 * Contains request metadata and the name of the scene.
 */
export interface SceneNameResponse {
  meta: MetadataResponse;
  name: string;
}

/**
 * JSON strucutre of scene queue position response from the backend.
 * Contains request metadata, the stage of the scene, and the position in the stages queue.
 */
export interface SceneQueuePositionResponse {
  meta: MetadataResponse;
  stage: string;
  position: number;
}



