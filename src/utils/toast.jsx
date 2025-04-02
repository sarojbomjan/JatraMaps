import { useEffect } from "react";
import toast from "react-hot-toast";

export const showConfirmationToast = (message, onConfirm, onCancel) => {
  const toastId = toast.custom((t) => (
    <div className={`px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
      <p className="text-gray-800 dark:text-gray-200 mb-4">{message}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => {
            onCancel?.();
            toast.dismiss(toastId);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(toastId);
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
        >
          Confirm
        </button>
      </div>
    </div>
  ), {
    duration: Infinity, // Don't auto-dismiss
    position: 'top-center',
  });

  return toastId;
};