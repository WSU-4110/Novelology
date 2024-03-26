const formatTimeDifference = (timestamp, currentTime = Date.now()) => {
  if (!timestamp) return 'Unknown time';
  
  const differenceInSeconds = (currentTime - timestamp) / 1000;
  const days = differenceInSeconds / 86400 | 0;

  // If the difference is greater than 1 day, return the number of days ago
  // If the number of days is greater than 1, return 'days' instead of 'day'
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;

  const hours = differenceInSeconds / 3600 | 0;
  // If the difference is less than 1 hour, return the number of minutes ago
  // Otherwise, return the number of hours ago
  // If the number of hours is greater than 1, return 'hours' instead of 'hour'
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

  const minutes = differenceInSeconds / 60 | 0;
  // If the difference is less than 1 minute, return 'Just Now'
  // Otherwise, return the number of minutes ago
  // If the number of minutes is greater than 1, return 'minutes' instead of 'minute'
  return minutes === 0 ? 'Just Now' : `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
};

export default formatTimeDifference;
