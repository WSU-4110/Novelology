import React from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const ReportOptions = ({ onClose, postId }) => {
    const handleReportOption = async (option) => {
        try {
            if (!postId) {
                console.error('postId is undefined or null');
                return;
            }

            const postRef = doc(db, 'posts', postId);
            const postDocSnap = await getDoc(postRef);

            if (!postDocSnap.exists()) {
                console.error('Post not found');
                alert('Error: Post not found.');
                return;
            }

            // Use updateDoc with arrayUnion to append the new report to the reports array
            await updateDoc(postRef, {
                reports: arrayUnion({ reason: option, timestamp: Date.now(), reporter: auth.currentUser.uid})
            });

            console.log('Reported option:', option);
            onClose();
            alert('Report submitted successfully.');
        } catch (error) {
            console.error('Error reporting post:', error.message);
            alert('Error reporting post: ' + error.message);
        }
    };

    return (
        <div className="relative shadow-lg mt-12 w-40 bg-white p-2 rounded z-50" aria-labelledby="report-options">
            <ul role="menu">
                <li className="cursor-pointer" onClick={() => handleReportOption('Offensive')}>
                    Offensive
                </li>
                <li className="cursor-pointer" onClick={() => handleReportOption('Against Rules')}>
                    Against Rules
                </li>
            </ul>
        </div>
    );
};

export default ReportOptions;
