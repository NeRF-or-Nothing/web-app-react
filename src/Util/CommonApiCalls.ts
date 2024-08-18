/**
 * @file CommonApiCalls.ts
 * @desc Commonly used fetch api calls to backend
*/


import { BACKEND_URL } from './Constants';
import { MetadataResponse, SceneMetadataResponse } from '../Types/Responses';


/** 
 * @desc Fetches metadata for a (hopefully) completed scene/job on the backend.
 * @returns SceneMetadataResponse on success, null on failure
 */
async function fetchSceneMetadata(
  sceneID: string, 
  token: string, 
  outputType?: string
): Promise<SceneMetadataResponse | null> {
  try {
    const url = `${BACKEND_URL}/data/scenemetadata/${sceneID}`;
    
    const formData = new FormData();
    if (outputType) {
      formData.append('output_type', outputType);
    }

    console.log("Fetching from", url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as SceneMetadataResponse;
    return data;
  } catch (error) {
    console.error(`Error fetching job data for ${sceneID}:`, error);
    return null;
  }
}
/**
 * @desc Fetches the user's scene history from the backend.
 * @Requires a valid token containing user's ID
 * @returns Array of scene IDs on success, null on failure
 */
async function fetchUserHistory(token: string): Promise<string[] | null> {
  try {
    console.log("Fetching from ", `${BACKEND_URL}/history`);
    const response = await fetch(`${BACKEND_URL}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.resources || [];
  } catch (error) {
    console.error('Error fetching user history:', error);
    return null;
  }
}

/**
 * @desc Logs existing user into NeRF-Or-Nothing
 * @returns JWT token containing userID on success, null on failure
 */
async function fetchLogin(username: string, password: string): Promise<string | null> {
  try {
    console.log("Fetching from ", `${BACKEND_URL}/login`);
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data.jwtToken;
  } catch (error: any) {
    console.error('Error logging in:', error);
    return null;
  }
}

/**
 * @desc Registers a new user with NeRF-Or-Nothing
 * @returns True on success, false on failure
 */
async function fetchRegister(username: string, password: string): Promise<boolean | null> {
  try {

    console.log("Fetching from ", `${BACKEND_URL}/register`);
    const response = await fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: username,
        password: password
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, ${data.message || 'Registration failed'}`);
    }

    return true;

  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

/**
 * @desc Posts a new scene to the backend for processing
 * @returns MetaDataResponse on success, null on failure
 */
async function fetchPostVideo(
  file: File, 
  config: any, 
  token: string
): Promise<MetadataResponse | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('training_mode', config.trainingMode);
    formData.append('output_types', config.outputTypes.join(','));
    formData.append('save_iterations', config.saveIterations.join(','));
    formData.append('total_iterations', Math.min(Math.max(...config.saveIterations), 30000).toString());
    formData.append('scene_name', config.sceneName);

    console.log("Fetching from ", `${BACKEND_URL}/video`);

    const response = await fetch(`${BACKEND_URL}/video`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    // Verify request success
    const validStatusCodes = [200, 202];
    if (!validStatusCodes.includes(response.status)) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    // Parse response data
    const responseData = await response.json() as MetadataResponse;
    return responseData

  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}

export { 
  fetchSceneMetadata,
  fetchUserHistory, 
  fetchLogin,
  fetchRegister,
  fetchPostVideo,
};
