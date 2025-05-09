import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

const DeleteModal = ({
  showModal,
  setShowModal,
  handleDeleteAccount,
  isDeleting,
  deleteError,
}) => {
  const [deletePassword, setDeletePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deletePassword) {
      return;
    }
    handleDeleteAccount(deletePassword);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-600 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
          Confirm Account Deletion
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete your account? This action cannot be
          undone. All your data will be permanently removed.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter your password to confirm
            </label>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
              autoComplete="current-password"
            />
          </div>

          {deleteError && (
            <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
              {deleteError}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setDeletePassword("");
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
