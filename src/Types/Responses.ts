/**
 * @file Responses.ts
 * @desc This file contains type declarations for decoding JSON responses from the backend.
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
 * Contains metadata and list of scene ids.
 */
export interface UserHistoryResponse {
  meta: MetadataResponse;
  resources: string[];
}

/**
 * JSON structure of scene name response from the backend.
 */
export interface SceneNameResponse {
  meta: MetadataResponse;
  name: string;
}

/**
 * JSON strucutre of scene queue position response from the backend.
 */

export interface SceneQueuePositionResponse {
  meta: MetadataResponse;
  stage: string;
  position: number;
}



