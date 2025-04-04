import { createContext, useContext, useState } from 'react';
import { 
  ChevronFirst, 
  ChevronLast,
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Tag,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Userimg from "../../assets/user.jpg"

export const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded}}>
        <aside className={`h-screen ${expanded ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <nav className="h-full flex flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h2 className={`text-xl font-bold text-blue-600 dark:text-blue-400 overflow-hidden transition-all ${
            expanded ? "w-full" : "w-0"
          }`}>
            JatraMaps
          </h2>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t dark:border-gray-700 flex p-3">
          <img
            src={Userimg}
            alt="User"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold dark:text-white">Admin User</h4>
              <span className="text-xs text-gray-600 dark:text-gray-400">Administrator</span>
            </div>
            <MoreVertical size={20} className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </nav>
    </aside>
    </SidebarContext.Provider>
  );
}

// Sidebar Item Component
export function SidebarItem({ icon, text, active, alert, to, onClick}) {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        }
      `}
      onClick={handleClick}
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
          className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm
            invisible opacity-0 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default {
  Sidebar,
  SidebarItem
};