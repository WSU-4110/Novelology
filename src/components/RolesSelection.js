import React from "react";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const RolesSelection = ({ selectedRoles, setSelectedRoles }) => {
  
  useEffect(() => {
    const user = auth.currentUser;
    const loadUserData = async () => {
      try {
        const userDoc = doc(db, "users", user.uid);
        const userDocRef = await getDoc(userDoc);

        selectedRoles = userDocRef.data().role;
      } catch (error) {
        
      }
    };
  });

  return (

          <div className="mt-2">
          <label className="block">
              <input
                  type="checkbox"
                  value="Reader"
                  checked={selectedRoles.includes("Reader")}
                  onChange={() => setSelectedRoles("Reader")}
              />
              Reader
          </label>
          <label className="block">
              <input
                  type="checkbox"
                  value="Reviewer"
                  checked={selectedRoles.includes("Reviewer")}
                  onChange={() => setSelectedRoles("Reviewer")}
              />
              Reviewer
          </label>
          <label className="block">
              <input
                  type="checkbox"
                  value="Author"
                  checked={selectedRoles.includes("Author")}
                  onChange={() => setSelectedRoles("Author")}
              />
              Author
          </label>
      </div>
  );
};

export default RolesSelection;
