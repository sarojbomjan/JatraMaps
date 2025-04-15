import React, { useEffect, useState } from "react";
import { Camera, User, Mail, Lock, Save, Trash2, Loader2 } from "lucide-react";
import UserLogo from "../../../assets/user.jpg";
import axios from "axios";
import { getAccessToken, clearTokens } from "../../../utils/auth";

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const userData = {
          username: response.data?.username,
          email: response.data?.email || "No email set",
          bio: response.data?.bio || "",
        };
        console.log("Processed User Data:", userData);
        setUser(userData);
        setFormData(userData);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          clearTokens();
          setError("Session expired. Please login again.");
        } else {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch user data. Please try again later."
          );
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccessMessage(null);
      const token = getAccessToken();

      const response = await axios.put(
        "http://localhost:5000/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = {
        username: response.data.username || user.username,
        email: response.data.email || user.email,
        bio: response.data.bio || user.bio,
      };

      setUser(updatedUser);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      if (err.response?.status === 401) {
        clearTokens();
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || "Failed to update profile");
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccessMessage(null);

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError("New passwords don't match");
        return;
      }

      const token = getAccessToken();
      await axios.put(
        "http://localhost:5000/changePassword",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      if (err.response?.status === 401) {
        clearTokens();
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || "Failed to change password");
        console.log(setError);
      }
    }
  };

  const cancelEdit = () => {
    setFormData(user);
    setIsEditing(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error && !user.username) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <div className="mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-700">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings
        </p>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mt-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "profile"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>

            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "account"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                      <img
                        src={UserLogo}
                        alt={user.username}
                        width={160}
                        height={160}
                        className="h-full w-full object-cover"
                      />
                      <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {user.username || "No username set"}
                  </h2>
                </div>

                <div className="md:w-2/3">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Personal Information
                          </h3>
                          {!isEditing ? (
                            <button
                              type="button"
                              onClick={() => setIsEditing(true)}
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                            >
                              Edit
                            </button>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="text-gray-600 dark:text-gray-400 hover:underline text-sm font-medium"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                              >
                                Save
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Username
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                                  isEditing
                                    ? "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                                    : "border-transparent bg-gray-100 dark:bg-gray-700"
                                } dark:text-white`}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Email
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-2 border rounded-md ${
                                  isEditing
                                    ? "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                                    : "border-transparent bg-gray-100 dark:bg-gray-700"
                                } dark:text-white`}
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label
                              htmlFor="bio"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              name="bio"
                              rows={4}
                              value={formData.bio}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className={`w-full px-4 py-2 border rounded-md ${
                                isEditing
                                  ? "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                                  : "border-transparent bg-gray-100 dark:bg-gray-700"
                              } dark:text-white`}
                              placeholder="Tell us about yourself..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div>
              <div className="mb-8">
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Change Password
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      disabled={passwordLoading}
                    >
                      {passwordLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin inline-block" />
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </div>

                  {passwordChangeError && (
                    <div className="text-sm text-red-500">
                      {passwordChangeError}
                    </div>
                  )}

                  {passwordChangeSuccess && (
                    <div className="text-sm text-green-500">
                      {passwordChangeSuccess}
                    </div>
                  )}
                </form>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Danger Zone
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                        Delete Account
                      </h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        <p>
                          Once you delete your account, there is no going back.
                          Please be certain.
                        </p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
