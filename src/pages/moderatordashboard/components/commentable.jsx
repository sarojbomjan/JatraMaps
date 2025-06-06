import { RefreshCw, Search } from "lucide-react";
import CommentRow from "./commentrow";
import { useState, useEffect } from "react";

export default function CommentTable({
  comments: initialComments,
  isLoading,
  selectedComments,
  editingId,
  editedText,
  setSelectedComments,
  setEditingId,
  setEditedText,
  setShowBanModal,
  setCurrentAction,
  setCurrentUserId,
  handleAction,
  handleSave,
  fetchComments,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredComments, setFilteredComments] = useState(initialComments);

  useEffect(() => {
    const filtered = initialComments.filter((comment) => {
      // Filter by status
      const statusMatch =
        filterStatus === "all" ||
        comment.status.toLowerCase() === filterStatus.toLowerCase();

      // Filter by search term
      const searchMatch =
        comment.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.event?.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        comment.user?.username
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });

    setFilteredComments(filtered);
  }, [searchTerm, filterStatus, initialComments]);

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedComments(
        filteredComments.map((comment) => comment._commentid)
      );
    } else {
      setSelectedComments([]);
    }
  };

  const handleRowSelect = (commentId) => {
    setSelectedComments((prevSelected) => {
      if (prevSelected.includes(commentId)) {
        return prevSelected.filter((id) => id !== commentId);
      } else {
        return [...prevSelected, commentId];
      }
    });
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Comment Moderation</h1>
        <p className="text-gray-600">
          Review, approve, and manage user comments
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-9 pl-3 pr-8 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="deleted">Deleted</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={fetchComments}
              className="h-9 px-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-2 text-sm text-gray-500">
        Showing {filteredComments.length} of {initialComments.length} comments
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={
                      selectedComments.length > 0 &&
                      selectedComments.length === filteredComments.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Event
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Comment
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredComments.length > 0 ? (
                filteredComments.map((comment) => (
                  <CommentRow
                    key={comment._commentid}
                    comment={comment}
                    isSelected={selectedComments.includes(comment._commentid)}
                    onSelect={handleRowSelect}
                    editingId={editingId}
                    editedText={editedText}
                    setEditingId={setEditingId}
                    setEditedText={setEditedText}
                    setShowBanModal={setShowBanModal}
                    setCurrentAction={setCurrentAction}
                    setCurrentUserId={setCurrentUserId}
                    handleAction={handleAction}
                    handleSave={handleSave}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No comments match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
