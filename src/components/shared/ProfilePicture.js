import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const ProfilePicture = ({ uid, alt }) => {
    const storage = getStorage(); // Get a reference to the Firebase Storage instance
    const profilePictureRef = ref(storage, `users/${uid}/profilePicture.jpg`);

    const [src, setSrc] = useState(null);

    useEffect(() => {
        getDownloadURL(profilePictureRef)
            .then((url) => setSrc(url)) // Set the profile picture URL if it exists
            .catch(() => setSrc('../assets/default-profile-picture.jpg')); // Set the default profile picture if there's an error or the profile picture doesn't exist
    }, [profilePictureRef]);

    return <img src={src} alt={alt} className="w-12 h-12 rounded-full mr-2" />;
};

export default ProfilePicture;
