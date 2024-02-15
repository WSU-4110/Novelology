import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const RolesSelection = ({ selectedRoles, setSelectedRoles, handleRoleToggle }) => {
  
  useEffect(() => {
    const user = auth.currentUser;
    const loadUserData = async () => {
      try {
        const userDoc = doc(db, "users", user.uid);
        const userDocRef = await getDoc(userDoc);

        setSelectedRoles(userDocRef.data().role); // Update selectedRoles state using setSelectedRoles
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [setSelectedRoles]); // Include setSelectedRoles in the dependency array

  return (
    <div className="grid space-y-3">
      {/* Checkbox inputs and labels */}
      <div className="relative flex items-start">
        <div className="flex items-center h-5 mt-1">
          <input
            type="checkbox"
            value="Reader"
            checked={selectedRoles.includes("Reader")}
            onChange={() => handleRoleToggle("Reader")}
            className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label htmlFor="reader" className="ms-3">
          <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300">Reader</span>
          <span id="reader-description" className="block text-sm text-gray-600 dark:text-gray-500">Notify me when this action happens.</span>
        </label>
      </div>

      <div className="relative flex items-start">
        <div className="flex items-center h-5 mt-1">
          <input
            type="checkbox"
            value="Reviewer"
            checked={selectedRoles.includes("Reviewer")}
            onChange={() => handleRoleToggle("Reviewer")}
            className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label htmlFor="reviewer" className="ms-3">
          <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300">Reviewer</span>
          <span id="reviewer-description" className="block text-sm text-gray-600 dark:text-gray-500">Notify me when this action happens.</span>
        </label>
      </div>

      <div className="relative flex items-start">
        <div className="flex items-center h-5 mt-1">
          <input
            type="checkbox"
            value="Author"
            checked={selectedRoles.includes("Author")}
            onChange={() => handleRoleToggle("Author")}
            className="border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label htmlFor="author" className="ms-3">
          <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300">Author</span>
          <span id="author-description" className="block text-sm text-gray-600 dark:text-gray-500">Notify me when this action happens.</span>
        </label>
      </div>
    </div>
  );
};

export default RolesSelection;
