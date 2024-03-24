import { MdOutlineNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useState, createContext, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const SidebarContext = createContext();
export default function SideBar({ children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="h-screen">
      <nav
        className={`h-full flex flex-col bg-lightcolor border-r shadow-sm ${
          expanded ? "w-80" : "w-[5.2rem]"
        }`}
      >
        <div className="p-4 pb-2 h-20 bg-maroon flex justify-between items-center">
          <img
            loading="lazy"
            srcSet={require("../assets/novelology_newlogo.png")}
            className= {`bg-maroon rounded-lg overflow-hidden transition-all ${
                expanded ? "w-16 h-14" : "w-0"
              }`}
          />
          <p className={`text-lightcolor ${expanded ? "":"hidden"}`}>Novelology</p>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <MdOutlineNavigateBefore /> : <FontAwesomeIcon icon={faBars} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src={require("../assets/default-profile-picture.jpg")}
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">UserName</h4>
              <span className="text-xs text-gray-600">Email</span>
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
