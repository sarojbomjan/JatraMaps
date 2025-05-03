import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BanModal({
  showBanModal,
  setShowBanModal,
  currentAction,
  banReason,
  setBanReason,
  currentUserId,
  fetchComments,
}) {
  const confirmBanAction = async () => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        currentAction === "Banned"
          ? `http://localhost:5000/admin/ban/${currentUserId}`
          : `http://localhost:5000/admin/unban/${currentUserId}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: banReason }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      toast.success(
        `User has been ${
          currentAction === "Banned" ? "banned" : "unbanned"
        } successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      setShowBanModal(false);
      setBanReason("");
      fetchComments();
    } catch (error) {
      console.error(
        `Error ${currentAction === "Banned" ? "banning" : "unbanning"} user:`,
        error
      );

      toast.error(
        `Failed to ${
          currentAction === "Banned" ? "ban" : "unban"
        } user. Please try again.`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  if (!showBanModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-white dark:bg-gray-500 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 dark:text-white">
          {currentAction === "Banned" ? "Ban User" : "Unban User"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {currentAction === "Banned"
            ? "This action will ban the user from system."
            : "This action will unban the user."}
        </p>

        {/* {currentAction === "Banned" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Ban (optional):
            </label>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              placeholder="Enter reason for banning this user..."
            />
          </div>
        )} */}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setShowBanModal(false);
              setBanReason("");
            }}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={confirmBanAction}
            className={`px-4 py-2 rounded-md text-white ${
              currentAction === "Banned"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {currentAction === "Banned" ? "Confirm Ban" : "Confirm Unban"}
          </button>
        </div>
      </div>
    </div>
  );
}
