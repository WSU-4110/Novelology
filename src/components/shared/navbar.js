import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPlus,
  faSignOutAlt,
  faSignInAlt,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Modal from "./HandleSignInClick";
import { handleLogout } from "../../functions/Auth";
import { Tooltip } from "react-tooltip";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="flex flex-row gap-4 p-4 bg-[#e3bd96] mt-4 w-full h-20 z-0">
      <Link to="/" data-tip="Home" data-for="home-tooltip">
        <FontAwesomeIcon
          icon={faHome}
          className="rounded-full w-8 p-2 h-8 bg-[#F4D7B7] text-[#e3bd96] cursor-pointer"
        />
      </Link>
      <Link to="/profile" data-tip="Profile" data-for="profile-tooltip">
        <FontAwesomeIcon
          icon={faUser}
          className="rounded-full bg-[#F4D7B7] text-[#e3bd96] w-8 h-8 p-2 cursor-pointer"
        />
      </Link>
      <Link
        to="/create-post"
        data-tip="Create a Post"
        data-for="create-post-tooltip"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="rounded-full w-8 h-8 bg-[#F4D7B7] text-[#e3bd96] p-2 cursor-pointer"
        />
      </Link>
      {!user ? (
        <Modal>
          <FontAwesomeIcon icon={faSignInAlt} />
        </Modal>
      ) : (
        <>
          <Link
            to="/settings"
            data-tip="Settings"
            className="rounded-full bg-[#F4D7B7] p-2 cursor-pointer"
            data-for="settings-tooltip"
          >
            <FontAwesomeIcon className="w-8 h-8 text-[#e3bd96]" icon={faGear} />
          </Link>
          <button
            data-tip="Sign off"
            className="rounded-full w-12 h-12 bg-[#F4D7B7] p-1 cursor-pointer"
            onClick={handleLogout}
            data-for="sign-off-tooltip"
          >
            <FontAwesomeIcon
              className="w-6 h-6 mt-1 text-[#e3bd96]"
              icon={faSignOutAlt}
            />
          </button>
        </>
      )}
      <Tooltip id="home-tooltip" />
      <Tooltip id="profile-tooltip" />
      <Tooltip id="create-post-tooltip" />
      <Tooltip id="sign-off-tooltip" />
    </nav>
  );
}