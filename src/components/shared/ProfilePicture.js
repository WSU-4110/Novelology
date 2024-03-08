import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import defaultProfilePicture from '../assets/default-profile-picture.jpg'; // Import default profile picture

const ProfilePicture = ({ uid, alt }) => {
    const storage = getStorage(); // Get a reference to the Firebase Storage instance
    const profilePictureRef = ref(storage, `users/${uid}/profilePicture.jpg`);

    const [src, setSrc] = useState(null);

    useEffect(() => {
        getDownloadURL(profilePictureRef)
            .then((url) => setSrc(url)) // Set the profile picture URL if it exists
            .catch(() => setSrc(defaultProfilePicture)); // Set the default profile picture if there's an error or the profile picture doesn't exist
    }, [profilePictureRef]);

    return <img src={src} alt={alt} className="w-8 h-8 rounded-full mr-2" />;
};

export default ProfilePicture;
