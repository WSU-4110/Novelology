import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

async function uploadImage(image, userId) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `users/${userId}/${image.name}`);

        // Upload the image file to Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Track upload progress if needed
            },
            (error) => {
                console.error('Error uploading file:', error);
                reject(error);
            },
            () => {
                // Upload completed successfully, now get the download URL
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log('File uploaded successfully:', downloadURL);
                    resolve(downloadURL);
                }).catch((downloadError) => {
                    console.error('Error getting download URL:', downloadError);
                    reject(downloadError);
                });
            }
        );
    });
}

export default uploadImage;
