import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

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
    <div className="mt-2">
      <label className="block">
        <input
          type="checkbox"
          value="Reader"
          checked={selectedRoles.includes("Reader")}
          onChange={() => handleRoleChange("Reader")}
        />
        Reader
      </label>
      <label className="block">
        <input
          type="checkbox"
          value="Reviewer"
          checked={selectedRoles.includes("Reviewer")}
          onChange={() => handleRoleChange("Reviewer")}
        />
        Reviewer
      </label>
      <label className="block">
        <input
          type="checkbox"
          value="Author"
          checked={selectedRoles.includes("Author")}
          onChange={() => handleRoleChange("Author")}
        />
        Author
      </label>
    </div>
  );
};

export default RolesSelection;
