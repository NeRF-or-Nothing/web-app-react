export const resourceTypeToExtension = (resourceType: string): string => {
    switch (resourceType) {
      case 'splat_cloud':
        return '.splat';
      case 'point_cloud':
        return '.ply';
      case 'video':
        return '.mp4';
      case 'model':
        return '.th';
      default:
        return '.bin'; // Default extension if type is unknown
    }
  };