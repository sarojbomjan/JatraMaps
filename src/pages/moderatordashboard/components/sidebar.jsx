import { X } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-orange-500 text-white p-4 shadow-md transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform md:relative md:translate-x-0 z-10 pt-20`}
    >
      <button
        onClick={() => setSidebarOpen(false)}
        className="md:hidden text-white text-right block w-full"
      >
        <X size={24} />
      </button>
      <nav>
        <ul className="space-y-2">
          <li className="p-2 bg-orange-600 rounded text-center font-medium">
            Dashboard
          </li>
          <li className="p-2 hover:bg-orange-600 rounded cursor-pointer text-center transition-colors duration-200">
            Users
          </li>
          <li className="p-2 hover:bg-orange-600 rounded cursor-pointer text-center transition-colors duration-200">
            Reports
          </li>
          <li className="p-2 hover:bg-orange-600 rounded cursor-pointer text-center transition-colors duration-200">
            Settings
          </li>
        </ul>
      </nav>
    </aside>
  );
}
