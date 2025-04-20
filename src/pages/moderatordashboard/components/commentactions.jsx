// CommentActions.jsx
import { Edit, Trash2, ChevronUp, ChevronDown, Save, X } from "lucide-react";

export default function CommentActions({
  comment,
  editingId,
  expanded,
  setEditingId,
  setEditedText,
  setShowBanModal,
  setCurrentAction,
  setCurrentUserId,
  toggleExpansion,
}) {
  const handleEdit = (e) => {
    e.stopPropagation();
    setEditingId(comment._id);
    setEditedText(comment.text);
  };

  const cancelEdit = (e) => {
    e.stopPropagation();
    setEditingId(null);
    setEditedText("");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setCurrentAction("Deleted");
    setCurrentUserId(comment.userId);
    setShowBanModal(true);
  };

  return (
    <div className="flex space-x-2">
      {editingId === comment._id ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Save logic would go here
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            <Save className="h-4 w-4" />
          </button>
          <button
            onClick={cancelEdit}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      ) : (
        <button
          onClick={handleEdit}
          className="text-blue-600 hover:text-blue-900"
        >
          <Edit className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <button
        onClick={toggleExpansion}
        className="text-gray-500 hover:text-gray-700"
      >
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
