  // Function to format time difference
    const formatTimeDifference = (timestamp) => {



    if (!timestamp) {
      return 'Unknown time';
    }

    const currentTime = new Date();
    const postTime = new Date(timestamp); // Remove seconds * 1000
    const differenceInSeconds = Math.floor((currentTime - postTime) / 1000);

    if (differenceInSeconds < 60) {
      return 'Just Now';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  export default formatTimeDifference;
