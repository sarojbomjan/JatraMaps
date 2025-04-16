import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Wheel from "../../assets/Wheel.png";

import {
  CheckCircle,
  Edit,
  Trash2,
  ShieldOff,
  Menu,
  Save,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../utils/authContext";

export default function ModeratorDashboard() {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    fetch("http://localhost:5000/moderator/moderation")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleAction = async (id, action) => {
    try {
      await fetch(`http://localhost:5000/moderator/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? { ...comment, status: action } : comment
        )
      );
    } catch (err) {
      console.error("Action failed:", err);
    }
  };
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:5000/moderator/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editedText }),
      });

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? { ...comment, text: editedText } : comment
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  // const handleAction = async (id, action) => {
  //   let endpoint = action === "Approved" ? `/comments/${id}/approve` : `/comments/${id}/delete`;

  //   await fetch(`http://localhost:5000${endpoint}`, {
  //     method: action === "Deleted" ? "DELETE" : "PUT",
  //   });

  //   setComments((prev) =>
  //     prev.map((comment) =>
  //       comment._id === id ? { ...comment, status: action } : comment
  //     )
  //   );
  // };

  // const handleEdit = (id, text) => {
  //   setEditingId(id);
  //   setEditedText(text);
  // };

  // const saveEdit = async (id) => {
  //   await fetch(`http://localhost:5000/comments/${id}/edit`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ text: editedText }),
  //   });

  //   setComments((prev) =>
  //     prev.map((comment) =>
  //       comment._id === id ? { ...comment, text: editedText } : comment
  //     )
  //   );
  //   setEditingId(null);
  // };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="bg-white text-gray-800 p-4 flex justify-between items-center fixed w-full top-0 shadow-md">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2"
        >
          <Menu size={24} />
        </button>
        {/* Logo */}
        <img src={Wheel} alt="Logo" width={100} height={50} />
        {/* <div className="">
              <Link to="/moderator/dashboard" className="text-xl md:text-2xl font-bold text-orange-600">
                JatraMaps
              </Link>
            </div> */}
        <h1 className="flex text-xl text-orange-600 font-bold">
          Moderator Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center bg-white px-4 py-2 rounded-md hover:bg-red-600 hover:text-amber-100 cursor-pointer"
        >
          <LogOut size={18} className="mr-2" /> Logout
        </button>
      </nav>

      <div className="flex flex-1 mt-32">
        {" "}
        {/* Push content below navbar */}
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-orange-500 text-white p-4 shadow-md transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:relative md:translate-x-0`}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white text-right block w-full"
          >
            <X size={24} />
          </button>
          <nav>
            <ul className="space-y-2">
              <li className="p-2 bg-orange-600 rounded text-center">
                Dashboard
              </li>
              <li className="p-2 hover:bg-orange-700 rounded cursor-pointer text-center">
                Users
              </li>
              <li className="p-2 hover:bg-orange-700 rounded cursor-pointer text-center">
                Reports
              </li>
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white p-4 rounded-md shadow-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300 text-gray-700">
                  <th className="p-2">Event</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Comment</th>
                  <th className="p-2">Status</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map(({ _id, user, text, status, eventTitle }) => (
                  <tr
                    key={_id}
                    className="border-b border-gray-300 hover:bg-orange-50"
                  >
                    <td className="p-2">{eventTitle}</td>
                    <td className="p-2">{user}</td>
                    <td className="p-2">
                      {editingId === _id ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="bg-gray-100 p-1 rounded w-full border"
                        />
                      ) : (
                        text
                      )}
                    </td>
                    <td
                      className={`p-2 font-bold text-center ${
                        status === "Pending"
                          ? "text-yellow-500"
                          : status === "Approved"
                          ? "text-green-500"
                          : status === "Deleted"
                          ? "text-red-500"
                          : status === "Banned"
                          ? "text-gray-600"
                          : ""
                      }`}
                    >
                      {status}
                    </td>
                    <td className="p-2 flex justify-center gap-2">
                      {/* Action buttons remain the same */}
                    </td>
                    <td className="p-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleAction(_id, "Banned")}
                        className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                      >
                        <ShieldOff size={18} />
                      </button>
                      <button
                        onClick={() => handleAction(_id, "Approved")}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-400"
                      >
                        <CheckCircle size={18} />
                      </button>

                      {editingId === _id ? (
                        <>
                          <button
                            onClick={() => saveEdit(_id)}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                          >
                            <Save size={18} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(_id, text)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                        >
                          <Edit size={18} />
                        </button>
                      )}

                      <button
                        onClick={() => handleAction(_id, "Deleted")}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
