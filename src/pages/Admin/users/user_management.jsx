import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Mail,
  UserPlus,
} from "lucide-react";
import UserFormModal from "./user_form_modal";
import axios from "axios";
import UserImg from "../../../assets/user.jpg";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/users");
        setUsers(formatUserData(response.data));
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatUserData = (apiResponse) => {
    if (apiResponse.success && Array.isArray(apiResponse.users)) {
      return apiResponse.users.map((user) => ({
        id: user._id || user.id,
        name: user.username || user.name || "Unknown",
        email: user.email,
        role: user.role || "user",
        status: user.status || "active",
        events: user.events || 0,
        avatar: UserImg,
      }));
    }

    console.error("Unexpected API response format:", apiResponse);
    return [];
  };

  // Filter users based on search query, role and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.joined).getTime() - new Date(a.joined).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.joined).getTime() - new Date(b.joined).getTime();
    } else if (sortBy === "name-az") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name-za") {
      return b.name.localeCompare(a.name);
    } else if (sortBy === "events-high") {
      return b.events - a.events;
    } else if (sortBy === "events-low") {
      return a.events - b.events;
    }
    return 0;
  });

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === sortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(sortedUsers.map((user) => user.id));
    }
  };

  const handleSaveUser = async (userData) => {
    // try {
    //   // In a real app, make API call to create user
    //   const response = await axios.post("/api/users", userData);
    //   const newUser = formatUserData([response.data])[0];
    //   setUsers([...users, newUser]);
    //   setShowUserModal(false);
    // } catch (err) {
    //   console.error("Error creating user:", err);
    //   setError("Failed to create user. Please try again.");
    // }
  };

  const handleDeleteUser = async (userId) => {
    // if (window.confirm("Are you sure you want to delete this user?")) {
    //   try {
    //     await axios.delete(`http://localhost:500/users/${userId}`);
    //     setUsers(users.filter(user => user.id !== userId));
    //   } catch (err) {
    //     console.error("Error deleting user:", err);
    //     setError("Failed to delete user. Please try again.");
    //   }
    // }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            Admin
          </span>
        );
      case "moderator":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Moderator
          </span>
        );
      case "customer":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            User
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {role}
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case "bannned":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="w-3 h-3 mr-1" />
            Banned
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="m-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and monitor user accounts
          </p>
        </div>
        <div>
          {/* <button
            onClick={() => setShowUserModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </button> */}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-15 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-5 text-gray-500 dark:text-gray-300" />
            </div>
            <div className="flex gap-3">
              <select
                className="w-full sm:w-48 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="customer">User</option>
              </select>
              <select
                className="w-full sm:w-48 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        {sortedUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No users found matching your criteria
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase text-gray-500 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === sortedUsers.length &&
                      sortedUsers.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                {/* <th className="p-3 text-left">Events</th> */}
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {user.name}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{getRoleBadge(user.role)}</td>
                  <td className="p-3">{getStatusBadge(user.status)}</td>

                  {/* <td className="p-3">{user.events}</td> */}
                  <td className="p-3 flex items-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                      onClick={() => alert("Edit User")}
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
                      title="More options"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* User Modal */}
      <UserFormModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
}
