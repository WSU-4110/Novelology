import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

const RolesSelection = ({ selectedRoles, setSelectedRoles }) => {
  const handleRoleChange = (role) => {
    setSelectedRoles((prevRoles) => {
      if (prevRoles.includes(role)) {
        return prevRoles.filter((selectedRole) => selectedRole !== role);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  useEffect(() => {
    const user = auth.currentUser;
    const loadUserData = async () => {
      try {
        const userDoc = doc(db, "users", user.uid);
        const userDocRef = await getDoc(userDoc);

        setSelectedRoles(userDocRef.data().role);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [setSelectedRoles]);

  return (
    <>
      <div className="flex w-1/2 ml-8 gap-5">
        Reader
        <input
          type="radio"
          value="reader"
          name="roles"
          checked={selectedRoles.includes("Reader")}
          onChange={() => handleRoleChange("Reader")}
          class="w-8 h-8 text-maroon ml-2 bg-maroon border-maroon accent-red focus:ring-maroon dark:focus:ring-maroon dark:ring-offset-maroon focus:ring-2 dark:bg-maroon dark:border-maroon"
        />
      </div>
      <div className="flex w-1/2 ml-6 gap-5">
        Author
        <input
          type="radio"
          value="author"
          name="roles"
          checked={selectedRoles.includes("Author")}
          onChange={() => handleRoleChange("Author")}
          class="w-8 h-8 text-maroon ml-2 bg-maroon border-maroon focus:ring-maroon dark:focus:ring-maroon dark:ring-offset-maroon focus:ring-2 dark:bg-maroon dark:border-maroon"
        />
      </div>

      {/* <div className="mt-2">
      <div class="flex">
        <div class="flex items-center h-5">
          <input type="checkbox" value="Reader" checked={selectedRoles.includes("Reader")} onChange={() => handleRoleChange("Reader")} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        </div>
        <div class="ms-2">
          <label class="font-medium text-gray-900">Reader</label>
          <p class="font-normal text-gray-500">A person who reads content</p>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center h-5">
          <input type="checkbox" value="Reviewer" checked={selectedRoles.includes("Reviewer")} onChange={() => handleRoleChange("Reviewer")} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        </div>
        <div class="ms-2">
          <label class="font-medium text-gray-90">Reviewer</label>
          <p class="font-normal text-gray-500">A person who reviews content</p>
        </div>
      </div>
      <div class="flex">
        <div class="flex items-center h-5">
          <input type="checkbox" value="Author" checked={selectedRoles.includes("Author")} onChange={() => handleRoleChange("Author")} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        </div>
        <div class="ms-2">
          <label class="font-3xl text-gray-900 ">Author</label>
          <p class="font-normal text-gray-500">A person who creates content</p>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default RolesSelection;
