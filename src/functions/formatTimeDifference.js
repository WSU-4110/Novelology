const formatTimeDifference = (timestamp, currentTime = Date.now()) => {
  if (!timestamp) return 'Unknown time';
  
  const differenceInSeconds = (currentTime - timestamp) / 1000;
  const days = differenceInSeconds / 86400 | 0;

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;

  const hours = differenceInSeconds / 3600 | 0;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

  const minutes = differenceInSeconds / 60 | 0;
  return `${minutes || 'Just Now'} minute${minutes !== 1 ? 's' : ''} ago`;
};

export default formatTimeDifference;
