import React from 'react';
import { db } from '../firebase';

const ReportOptions = ({ onClose, postId }) => {
    const handleReportOption = async (option) => {
        try {
            const postRef = db.collection('posts').doc(postId);

            // Get the existing post document
            const postDoc = await postRef.get();

            if (postDoc.exists) {
                // Update the existing post document with the report information
                await postRef.update({
                    report: {
                        reason: option,
                        timestamp: Date.now() // Use epoch time for timestamp
                    }
                });

                console.log('Reported option:', option);
                onClose();
            } else {
                console.error('Post not found');
            }
        } catch (error) {
            console.error('Error reporting post:', error);
        }
    };

    return (
        <div className="relative shadow-lg mt-12 w-40 bg-white p-2 rounded z-50">
            <ul>
                <li className="cursor-pointer" onClick={() => handleReportOption('Offensive')}>
                    Offensive
                </li>
                <li className="cursor-pointer" onClick={() => handleReportOption('Against Rules')}>
                    Against Rules
                </li>
                {/* Add more report options as needed */}
            </ul>
        </div>
    );
};

export default ReportOptions;
