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
      await fetch(
        `http://localhost:5000/comments/${
          currentAction === "Banned" ? "ban" : "unban"
        }/${currentUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason: banReason }),
        }
      );
      alert(
        currentAction === "Banned"
          ? "User has been banned from commenting."
          : "User is now allowed to comment."
      );
      setShowBanModal(false);
      setBanReason("");
      fetchComments();
    } catch (error) {
      console.error("Error banning/unbanning user:", error);
      alert("Failed to update comment permissions. Please try again.");
    }
  };

  if (!showBanModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-2">
          {currentAction === "Banned" ? "Ban User" : "Unban User"}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {currentAction === "Banned"
            ? "This action will prevent the user from posting new comments."
            : "This action will allow the user to post comments again."}
        </p>

        {currentAction === "Banned" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Ban (optional):
            </label>
            <textarea
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Enter reason for banning this user..."
            />
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setShowBanModal(false);
              setBanReason("");
            }}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
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
