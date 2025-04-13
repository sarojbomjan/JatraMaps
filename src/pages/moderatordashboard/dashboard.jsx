import { Check, Edit, Trash2, Ban, Shield } from 'lucide-react'; 
import backgroundImage from '../../assets/Shikali-Jatra.jpg'
import { useState } from 'react';

const initialComments = [
  {
    id: 1,
    user: 'Siris Tandukar',
    eventTitle: 'Machindranath Jatra',
    comment: 'This Jatra is most popular. ',
    status: 'Edited',
  },
  {
    id: 2,
    user: 'Jane Smith',
    eventTitle: 'Bisket Jatra',
    comment: 'It is celebrated in Bhaktapur.',
    status: 'Flagged',
  },
  {
    id: 3,
    user: 'Alice Brown',
    eventTitle: 'Ghode Jatra',
    comment: 'This Jatra is celebrated in Patan.',
    status: 'Approved',
  },
];

export default function ModeratorDashboard() {
  const [comments, setComments] = useState(initialComments);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const updateStatus = (id, newStatus) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const startEditing = (id, currentComment) => {
    setEditingId(id);
    setEditText(currentComment);
  };

  const saveEditedComment = (id) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, comment: editText } : c))
    );
    setEditingId(null);
    updateStatus(id, 'Edited');
  };

  return (
    <div
      className="flex min-h-screen bg-white"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Corrected syntax here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-orange-500 text-white p-6 bg-opacity-90"> 
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="text-white text-2xl" /> 
          <h2 className="text-2xl font-bold">Moderator Panel</h2>
        </div>
        <ul className="space-y-4">
          <li className="font-medium hover:text-orange-200 cursor-pointer">Dashboard</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-10 bg-gray-100 bg-opacity-70"> 
        <h1 className="text-3xl font-bold text-orange-600 mb-8">Comment Moderation</h1>

        <div className="max-w-7xl mx-auto overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-orange-100 text-orange-600">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Event</th>
                <th className="px-6 py-4 font-medium">Comment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(({ id, user, eventTitle, comment, status }) => (
                <tr key={id} className="border-t">
                  <td className="px-6 py-4">{user}</td>
                  <td className="px-6 py-4">{eventTitle}</td>
                  <td className="px-6 py-4">
                    {editingId === id ? (
                      <input
                        type="text"
                        value={editText}
                        autoFocus
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={() => saveEditedComment(id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEditedComment(id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      comment
                    )}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${status === 'Approved' ? 'text-green-600' : status === 'Flagged' ? 'text-yellow-600' : status === 'Edited' ? 'text-blue-600' : status === 'Banned' ? 'text-black' : 'text-red-600'}`}
                  >
                    {status}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button onClick={() => updateStatus(id, 'Approved')}>
                      <Check className="text-green-600 hover:scale-110" />
                    </button>
                    <button onClick={() => startEditing(id, comment)}>
                      <Edit className="text-blue-600 hover:scale-110" />
                    </button>
                    <button onClick={() => updateStatus(id, 'Deleted')}>
                      <Trash2 className="text-red-600 hover:scale-110" />
                    </button>
                    <button onClick={() => updateStatus(id, 'Banned')}>
                      <Ban className="text-black hover:scale-110" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
