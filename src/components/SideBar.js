import { MdOutlineNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useState, createContext, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js';
import fetchPFP from '../functions/fetchPFP';
import { doc, getDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";

const SidebarContext = createContext();
export default function SideBar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [fetchedProfilePicture, setFetchedProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            if (user && !userData) {
                const userRef = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userRef);

                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    setUserData(userData);
                    localStorage.setItem('userData', JSON.stringify(userData)); 
                } else {
                    console.log('User document does not exist');
                }

                const profilePictureURL = await fetchPFP(user.uid);
                if (profilePictureURL !== fetchedProfilePicture) {
                    setFetchedProfilePicture(profilePictureURL);
                    localStorage.setItem('profilePicture', profilePictureURL); 
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } 
    };

    fetchUserData();
}, [user, userData, fetchedProfilePicture]);
const defaultProfilePicture = require('../assets/default-profile-picture.jpg');

  return (
    <aside className="h-screen">
      <nav
        className={`h-full flex flex-col bg-lightcolor border-r shadow-sm ${
          expanded ? "w-80" : "w-[5.2rem]"
        }`}
      >
        <div className="p-4 pb-2 h-20 w-full bg-maroon flex justify-between items-center">

          <p className={`text-lightcolor ${expanded ? "":"hidden"}`}>Novelology</p>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg w-full text-gray-50 hover:bg-secondary"
          >
            {expanded ? <MdOutlineNavigateBefore /> : <FontAwesomeIcon icon={faBars} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        
        <div className="border-t flex p-3">
        <Link to="/profile">
          <img
            src={fetchedProfilePicture || defaultProfilePicture} 

            className="w-10 h-10 rounded-full ml-2"
          />
          </Link>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            } `}
          >
            
            <div className="leading-4">
              <h4 className="font-semibold">
                <span className="text-blue-500">@</span>
                {userData && userData.username}</h4>
              <span className="text-xs text-gray-600">{userData && userData.email}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SideBarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-3 px-3 my-1 font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-gray-200 to-red-300 text-maroon"
            : "hover:bg-gray-200 text-gray-600"
        }
        `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-maroon ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100
                    translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
