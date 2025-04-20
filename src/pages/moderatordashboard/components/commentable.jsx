// CommentTable.jsx
import { RefreshCw, Search } from "lucide-react";
import CommentRow from "./commentrow";

export default function CommentTable({
  comments,
  isLoading,
  selectedComments,
  editingId,
  editedText,
  searchTerm,
  filterStatus,
  setSearchTerm,
  setFilterStatus,
  fetchComments,
  setSelectedComments,
  setEditingId,
  setEditedText,
  setShowBanModal,
  setCurrentAction,
  setCurrentUserId,
}) {
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedComments(comments.map((comment) => comment._id));
    } else {
      setSelectedComments([]);
    }
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

      {/* Bulk Actions would go here */}

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
                      selectedComments.length === comments.length
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
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentRow
                    key={comment._id}
                    comment={comment}
                    selectedComments={selectedComments}
                    editingId={editingId}
                    editedText={editedText}
                    setSelectedComments={setSelectedComments}
                    setEditingId={setEditingId}
                    setEditedText={setEditedText}
                    setShowBanModal={setShowBanModal}
                    setCurrentAction={setCurrentAction}
                    setCurrentUserId={setCurrentUserId}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No comments found. Try adjusting your search or filters.
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
