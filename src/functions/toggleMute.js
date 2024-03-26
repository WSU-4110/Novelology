import { toast } from 'react-toastify';
import { auth, db } from '../firebase.js';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs, deleteDoc } from 'firebase/firestore';
import createNotification from './createNotification';

export const toggleMute = async (toUserId) => {
  try {
    if (!toUserId) {
      console.error('Target user ID not provided.');
      toast.error('Target user ID not provided.');
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error('Current user not authenticated.');
      toast.error('Current user not authenticated.');
      return;
    }

    const currentUserId = currentUser.uid;
    const userRef = doc(db, 'users', currentUserId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error('User document not found.');
      toast.error('User document not found.');
      return;
    }

    const userDocData = userDoc.data();
    const mutedList = userDocData.muted || [];

    if (mutedList.includes(toUserId)) {
      // Unmute the user
      await updateDoc(userRef, {
        muted: arrayRemove(toUserId),
      });
      toast.success('User unmuted successfully.');
      // if they sent a follow request, notify the user of the follow request
      await createNotification(toUserId, currentUserId, new Date(), "follow_request");
    } else {
      // Mute the user
      await updateDoc(userRef, {
        muted: arrayUnion(toUserId),
      });
      toast.success('User muted successfully.');

      //delete all notifications from the user you've muted
      const notificationsRef = collection(db, 'users', currentUserId, 'notifications');
      const notificationsSnapshot = await getDocs(notificationsRef);
      notificationsSnapshot.forEach(async (doc) => {
        if (doc.data().fromUserId === toUserId) {
          await deleteDoc(doc.ref);
        }
      });
    }
  } catch (error) {
    console.error('Error muting/unmuting user:', error);
    toast.error('Error muting/unmuting user.');
  }
};
