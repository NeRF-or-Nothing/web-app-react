/**
 * @file Responses.ts
 * @desc This file contains type declarations for decoding JSON responses from the backend.
 */


/**
 * JSON structure of the POST response to /video from the backend.
 * TODO: Probably refactor POSTResponse to something more specific
 */
export type POSTResponse = {
  meta: {
    status: string;
    error: string;
    message: string;
  };
  uuid: string;
  config: {
    training_mode: string;
    output_types: string | string[];
    save_iterations: string | number[];
    total_iterations: string | number;
  };
};

/**
 * JSON structure of the metadata response from the backend.
 */
export interface MetadataResponse {
  meta: {
    uuid: string;
    status: number;
    error: number;
    message: string;
  };
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