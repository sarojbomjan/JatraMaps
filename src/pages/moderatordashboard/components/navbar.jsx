import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../../utils/authContext";

export default function Navbar({ sidebarOpen, setSidebarOpen, Wheel }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="dark:bg-white bg-gray-300 text-gray-800 p-2 md:p-4 flex justify-between items-center fixed w-full top-0 shadow-md z-10">
      <div className="flex items-center gap-2 md:gap-4">
        {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-1 hover:bg-gray-100 rounded-full"
        >
          <Menu size={20} />
        </button> */}
        <div className="flex items-center">
          <img src={Wheel} alt="Logo" className="h-8 w-auto md:h-10" />
          <span className="ml-2 text-lg md:text-xl font-semibold text-orange-600">
            EventHub
          </span>
        </div>
      </div>
      <h1 className="text-lg md:text-xl text-orange-600 font-bold">
        Moderator Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="flex items-center bg-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-200"
      >
        <LogOut size={16} className="mr-1 md:mr-2" />
        <span className="hidden md:inline">Logout</span>
      </button>
    </nav>
  );
}
