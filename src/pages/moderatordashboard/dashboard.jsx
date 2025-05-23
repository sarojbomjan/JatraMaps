import React, { useState, useEffect } from "react";
import Wheel from "../../assets/Wheel.png";
import BanModal from "./components/banmodal";
import CommentTable from "./components/commentable";
import Navbar from "./components/navbar";

export default function ModeratorDashboard() {
  const [comments, setComments] = useState([]);
  const [showBanModal, setShowBanModal] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [currentAction, setCurrentAction] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [selectedComments, setSelectedComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/comments/moderation?t=${new Date().getTime()}`
      );
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Failed to fetch comments. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      comment.status?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleAction = async (commentId, action, userId, e) => {
    if (e) e.stopPropagation();
    try {
      if (action === "Deleted") {
        await fetch(`http://localhost:5000/comments/${commentId}/delete`, {
          method: "DELETE",
        });
        setComments((prev) =>
          prev.filter((comment) => comment._commentid !== commentId)
        );
        setSelectedComments((prev) => prev.filter((id) => id !== commentId));
      } else if (action === "Banned") {
        if (!userId) {
          throw new Error("No user ID provided for ban action");
        }
        setCurrentAction(action);
        setCurrentUserId(userId);
        setShowBanModal(true);
      } else if (action === "Unbanned") {
        await fetch(`http://localhost:5000/comments/unban/${userId}`, {
          method: "PUT",
        });
        alert("User has been unbanned.");
        fetchComments();
      } else if (action === "Approved" || action === "Rejected") {
        await fetch(`http://localhost:5000/comments/status/${commentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: action }),
        });
        setComments((prev) =>
          prev.map((comment) =>
            comment._commentid === commentId
              ? { ...comment, status: action }
              : comment
          )
        );
      }
    } catch (err) {
      console.error("Action failed:", err);
      alert("Failed to perform action. Please try again.");
    }
  };

  const handleSaveComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/comments/${commentId}/edit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editedText }),
        }
      );

      if (!response.ok) throw new Error("Failed to update comment");

      setComments((prev) =>
        prev.map((comment) =>
          comment._commentid === commentId
            ? { ...comment, text: editedText }
            : comment
        )
      );
      setEditingId(null);
      setEditedText("");
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200 text-gray-900">
      <Navbar Wheel={Wheel} />

      <div className="flex flex-1 pt-16">
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <CommentTable
            comments={filteredComments}
            isLoading={isLoading}
            selectedComments={selectedComments}
            editingId={editingId}
            editedText={editedText}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            setSearchTerm={setSearchTerm}
            setFilterStatus={setFilterStatus}
            fetchComments={fetchComments}
            setSelectedComments={setSelectedComments}
            setEditingId={setEditingId}
            setEditedText={setEditedText}
            setShowBanModal={setShowBanModal}
            setCurrentAction={setCurrentAction}
            setCurrentUserId={setCurrentUserId}
            handleAction={handleAction}
            handleSave={handleSaveComment}
          />
        </div>
      </div>

      <BanModal
        showBanModal={showBanModal}
        setShowBanModal={setShowBanModal}
        currentAction={currentAction}
        banReason={banReason}
        setBanReason={setBanReason}
        currentUserId={currentUserId}
        fetchComments={fetchComments}
      />
    </div>
  );
}
