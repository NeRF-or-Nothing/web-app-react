/**
 * @file CommonFetch.ts
 * @desc Commonly used fetch api calls to backend
 * TODO: Decode json into MetadataResponse type.
*/
import { BACKEND_URL } from './Constants';

/** 
 * @desc Fetches metadata for a (hopefully) completed job on the backend.
*/
export const fetchMetadata = async (uuid: string, token: string) => {
  try {
    console.log("Fetching from ", `${BACKEND_URL}/data/metadata/${uuid}`);

    const response = await fetch(`${BACKEND_URL}/data/metadata/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching metadata for ${uuid}:`, error);
    return null;
  }
};