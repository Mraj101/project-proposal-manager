import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const UserProfile = () => {
  const { usr, setUsr } = useAuthContext();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('user'));
    setUsr(userDataFromStorage);
  }, []);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/newuser/changeCurrentPassword',
        {
          oldPassword,
          newPassword
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${usr.accessToken}`,
          },
        }
      );
      // Assuming the response contains updated user data, update user context
      setUsr(response.data.user);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
      setSuccess(false);
    }
  };

  const handleUpdatePasswordClick = () => {
    setShowPasswordInputs(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden w-96">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <img
              src={usr ? usr.img : "https://via.placeholder.com/150"}
              alt="User Profile"
              className="rounded-full h-32 w-32 mb-4 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-2">{usr ? usr.fullName : "Loading..."}</h2>
            <p className="text-gray-600 mb-4">{usr ? usr.email : "Loading..."}</p>
            {usr && (
              <p className="text-gray-600 mb-4">Username: {usr.username}</p>
            )}

            {/* Update Password button */}
            <button
              onClick={handleUpdatePasswordClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            >
              Update Password
            </button>

            {/* Password update form */}
            {showPasswordInputs && (
              <div className="flex flex-col items-center">
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
                />
                <button
                  onClick={handleChangePassword}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Change Password
                </button>
              </div>
            )}

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">Password updated successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
