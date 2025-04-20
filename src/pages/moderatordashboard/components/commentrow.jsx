import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  FastForward,
  Shield,
  CheckCircle,
  Trash2,
} from "lucide-react";
import StatusBadge from "./statusbadge";
import CommentActions from "./commentactions";

export default function CommentRow({
  comment,
  editingId,
  editedText,
  setEditingId,
  setEditedText,
  setShowBanModal,
  setCurrentAction,
  setCurrentUserId,
  handleAction,
}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(false); // Local state for selection

  const toggleExpansion = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleSelectComment = (e) => {
    e.stopPropagation();
    setSelected(!selected); // Toggle selection
  };

  const handleApprove = async (e) => {
    e.stopPropagation();
    try {
      await handleAction(comment._id, "Approved", comment.userId); // Only approve the specific comment
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await handleAction(comment._id, "Deleted", comment.userId); // Only delete the specific comment
  };

  return (
    <>
      <tr className="hover:bg-gray-50" key={comment._id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            checked={selected} // Local state for selection
            onChange={handleSelectComment}
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {comment.eventTitle}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {comment.user}
          </div>
          <div className="text-xs text-gray-500">{comment.userId}</div>
        </td>
        <td className="px-6 py-4">
          {editingId === comment._id ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2 border rounded-md"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="text-sm text-gray-900 line-clamp-2">
              {comment.text}
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge status={comment.status} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <CommentActions
            comment={comment}
            editingId={editingId}
            expanded={expanded}
            setEditingId={setEditingId}
            setEditedText={setEditedText}
            setShowBanModal={setShowBanModal}
            setCurrentAction={setCurrentAction}
            setCurrentUserId={setCurrentUserId}
            toggleExpansion={toggleExpansion}
          />
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50">
          <td colSpan={6} className="px-6 py-4">
            <div className="flex flex-col md:flex-row justify-end gap-4">
              <div className="flex flex-wrap gap-2 items-start">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentAction("Banned");
                    setCurrentUserId(comment.userId);
                    setShowBanModal(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 text-white hover:bg-gray-600 rounded-md text-sm"
                >
                  <Shield size={16} />
                  <span>Ban User</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(comment._id, "Approved", comment.userId); // Only approve the specific comment
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white hover:bg-green-400 rounded-md text-sm"
                >
                  <CheckCircle size={16} />
                  <span>Approve</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(comment._id, "Deleted", comment.userId); // Only delete the specific comment
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white hover:bg-red-400 rounded-md text-sm"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
