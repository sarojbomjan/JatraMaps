import { useState } from "react";
import { CheckCircle, Edit, Trash2, ShieldOff, Menu, Save, X } from "lucide-react";

const commentsData = [
  { id: 1, user: "John Doe", text: "Great post!", status: "Pending" },
  { id: 2, user: "Jane Smith", text: "This is spam!", status: "Flagged" },
  { id: 3, user: "Alice Brown", text: "Nice article!", status: "Approved" },
];

export default function ModeratorDashboard() {
  const [comments, setComments] = useState(commentsData);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleAction = (id, action) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, status: action } : comment
      )
    );
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, text: editedText } : comment
      )
    );
    setEditingId(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Moderator Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded">Dashboard</li>
            <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Users</li>
            <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Reports</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Comment Moderation</h1>
          <button className="md:hidden p-2 bg-gray-700 rounded">
            <Menu size={20} />
          </button>
        </div>

        {/* Comments Table */}
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">User</th>
                <th className="p-2">Comment</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(({ id, user, text, status }) => (
                <tr key={id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-2">{user}</td>
                  <td className="p-2">
                    {editingId === id ? (
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="bg-gray-700 p-1 rounded w-full"
                      />
                    ) : (
                      text
                    )}
                  </td>
                  <td className={`p-2 font-bold ${
                    status === "Pending" ? "text-yellow-400" :
                    status === "Approved" ? "text-green-400" : "text-red-400"
                  }`}>{status}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleAction(id, "Approved")} className="p-2 bg-green-600 rounded hover:bg-green-500">
                      <CheckCircle size={18} />
                    </button>
                    {editingId === id ? (
                      <>
                        <button onClick={() => saveEdit(id)} className="p-2 bg-blue-600 rounded hover:bg-blue-500">
                          <Save size={18} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-2 bg-gray-600 rounded hover:bg-gray-500">
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(id, text)} className="p-2 bg-blue-600 rounded hover:bg-blue-500">
                        <Edit size={18} />
                      </button>
                    )}
                    <button onClick={() => handleAction(id, "Deleted")} className="p-2 bg-red-600 rounded hover:bg-red-500">
                      <Trash2 size={18} />
                    </button>
                    <button onClick={() => handleAction(id, "Banned")} className="p-2 bg-gray-600 rounded hover:bg-gray-500">
                      <ShieldOff size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}