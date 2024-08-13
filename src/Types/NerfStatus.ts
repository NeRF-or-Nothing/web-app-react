/**
 * @file NerfStatus.ts
 * @desc Rough translation of Status.py in web-server for frontend use. Maybe unneeded.
 */

export enum NerfErrorCode {
  NO_ERROR = 0,
  UNKNOWN = 1,
  FILE_EXISTS = 2,
  FILE_NOT_FOUND = 3,
  FILE_NOT_RECEIVED = 4,
  VIDEO_TOO_BLURRY = 5,
  INVALID_FILE_EXT = 6,
  INVALID_INPUT = 7,
  RESOURCE_UNAVAILABLE = 8,
  PROCESSING_FAILED = 9,
  INTERNAL_SERVER_ERROR = 10,
  INVALID_UUID = 11,
}

export enum NerfStatusCode {
  PROCESSING = 0,
  READY = 1,
  ERROR = 2,
}

interface NerfError {
  code: NerfErrorCode;
  message: string;
}

interface NerfStatus {
  code: NerfStatusCode;
  message: string;
}

export const NerfErrorMessages: { [key in NerfErrorCode]: string } = {
  [NerfErrorCode.NO_ERROR]: 'There is no error',
  [NerfErrorCode.UNKNOWN]: 'An unknown error occurred',
  [NerfErrorCode.FILE_EXISTS]: 'File already exists',
  [NerfErrorCode.FILE_NOT_FOUND]: 'File not found',
  [NerfErrorCode.FILE_NOT_RECEIVED]: 'File not received by server',
  [NerfErrorCode.VIDEO_TOO_BLURRY]: 'Video is too blurry',
  [NerfErrorCode.INVALID_FILE_EXT]: 'Invalid file extension',
  [NerfErrorCode.INVALID_INPUT]: 'Invalid input provided',
  [NerfErrorCode.RESOURCE_UNAVAILABLE]: 'Requested resource is unavailable',
  [NerfErrorCode.PROCESSING_FAILED]: 'Processing failed',
  [NerfErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [NerfErrorCode.INVALID_UUID]: 'Invalid UUID',
};

export const NerfStatusMessages: { [key in NerfStatusCode]: string } = {
  [NerfStatusCode.PROCESSING]: 'Processing',
  [NerfStatusCode.READY]: 'Finished Processing',
  [NerfStatusCode.ERROR]: 'Error',
};

export function getNerfErrorMessage(code: NerfErrorCode): string {
  return NerfErrorMessages[code] || 'Unknown error';
}

export function getNerfStatusMessage(code: NerfStatusCode): string {
  return NerfStatusMessages[code] || 'Unknown status';
}

export function parseNerfErrorCode(code: string | number): NerfErrorCode {
  const numericCode = typeof code === 'string' ? parseInt(code, 10) : code;
  return numericCode in NerfErrorCode ? numericCode : NerfErrorCode.UNKNOWN;
}

export function parseNerfStatusCode(code: string | number): NerfStatusCode {
  const numericCode = typeof code === 'string' ? parseInt(code, 10) : code;
  return numericCode in NerfStatusCode ? numericCode : NerfStatusCode.ERROR;
}

export enum UserErrorCode {
  NO_ERROR = 0,
  USER_NOT_FOUND = 1,
  INCORRECT_PASSWORD = 2,
  INVALID_JWT = 3,
  EMAIL_ALREADY_EXISTS = 4,
  USERNAME_ALREADY_EXISTS = 5,
  ID_ALREADY_EXISTS = 6,
  INVALID_EMAIL = 7,
  INVALID_USERNAME = 8,
  INVALID_ID = 9,
  INVALID_PASSWORD = 10,
}

export enum UserStatusCode {
  SUCCESS = 0,
  ERROR = 1,
}

export const UserErrorMessages: { [key in UserErrorCode]: string } = {
  [UserErrorCode.NO_ERROR]: 'There is no error',
  [UserErrorCode.USER_NOT_FOUND]: 'User not found',
  [UserErrorCode.INCORRECT_PASSWORD]: 'Incorrect password',
  [UserErrorCode.INVALID_JWT]: 'Invalid JWT',
  [UserErrorCode.EMAIL_ALREADY_EXISTS]: 'Email already exists',
  [UserErrorCode.USERNAME_ALREADY_EXISTS]: 'Username already exists',
  [UserErrorCode.ID_ALREADY_EXISTS]: 'ID already exists',
  [UserErrorCode.INVALID_EMAIL]: 'Invalid email',
  [UserErrorCode.INVALID_USERNAME]: 'Invalid username',
  [UserErrorCode.INVALID_ID]: 'Invalid ID',
  [UserErrorCode.INVALID_PASSWORD]: 'Invalid password',
};

export const UserStatusMessages: { [key in UserStatusCode]: string } = {
  [UserStatusCode.SUCCESS]: 'Success',
  [UserStatusCode.ERROR]: 'Error',
};

export function getUserErrorMessage(code: UserErrorCode): string {
  return UserErrorMessages[code] || 'Unknown error';
}

export function getUserStatusMessage(code: UserStatusCode): string {
  return UserStatusMessages[code] || 'Unknown status';
}

export function parseUserErrorCode(code: string | number): UserErrorCode {
  const numericCode = typeof code === 'string' ? parseInt(code, 10) : code;
  return numericCode in UserErrorCode ? numericCode : UserErrorCode.USER_NOT_FOUND;
}

export function parseUserStatusCode(code: string | number): UserStatusCode {
  const numericCode = typeof code === 'string' ? parseInt(code, 10) : code;
  return numericCode in UserStatusCode ? numericCode : UserStatusCode.ERROR;
}