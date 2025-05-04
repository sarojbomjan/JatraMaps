import React from "react";

export default function LoginPromptModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white dark:bg-gray-400 rounded-lg shadow-lg p-6 w-80 text-center pointer-events-auto">
        <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Please login to view details.
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
