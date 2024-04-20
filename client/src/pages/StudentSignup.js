import axios from "axios";
import { useState } from "react";

const StudentSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [studentId, setstudentId] = useState(""); // New state variable
  const [session, setSession] = useState(""); // New state variable
  const [department, setDepartment] = useState(""); // New state variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("img", image);
    formData.append("studentId", studentId); // Append new fields to FormData
    formData.append("session", session);
    formData.append("department", department);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/newuser/crt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("Error occurred while creating user:", error);
    }

    // Reset form fields and state variables
    setUsername("");
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    setImage(null);
    setImagePreview(null);
    setPasswordsMatch(true);
    setstudentId("");
    setSession("");
    setDepartment("");
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
      setImage(selectedImage);
    }
  };

  return (
    <div className="signup-container flex items-center justify-center min-h-screen">
      <div className="signup-content text-center max-w-screen-md w-full mx-auto">
        <h3 className="text-2xl font-semibold mt-6 text-blue-500">Sign Up</h3>
        <form className="bg-white p-6 rounded-lg">
          {/* Username */}
          <div className="mb-6 flex items-center">
            <label htmlFor="username" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Username:
            </label>
            <input
              id="username"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter your username"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-6 flex items-center">
            <label htmlFor="email" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Email address:
            </label>
            <input
              id="email"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email address"
              required
            />
          </div>
          {/* Full Name */}

          {/* Password */}
          <div className="mb-6 flex items-center">
            <label htmlFor="password" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Password:
            </label>
            <input
              id="password"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="mb-6 flex items-center">
            <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm your password"
              required
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>
          {/* Student ID  */}
          <div className="mb-6 flex items-center">
            <label htmlFor="studentId" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Student ID :
            </label>
            <input
              id="studentId"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setstudentId(e.target.value)}
              value={studentId}
              placeholder="Enter your Student ID "
              required
            />
          </div>
          {/* Session */}
          <div className="mb-6 flex items-center">
            <label htmlFor="session" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Session:
            </label>
            <select
              id="session"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setSession(e.target.value)}
              value={session}
              required
            >
              <option value="">Select Session</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
            </select>
          </div>
          {/* Department */}
          <div className="mb-6 flex items-center">
            <label htmlFor="department" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Department:
            </label>
            <select
              id="department"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              required
            >
              <option value="">Select Department</option>
              <option value="eee">EEE</option>
              <option value="cse">CSE</option>
              <option value="english">English</option>
            </select>
          </div>
          {/* Profile Picture */}
          <div className="flex flex-col gap-5 items-center">
            <div className="mb-6 flex items-center">
              <label htmlFor="image" className="text-sm font-bold text-gray-700">
                Profile Picture:
              </label>
              <input
                id="image"
                className="w-[100%] px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            {imagePreview && (
              <div className="mb-6 flex items-center">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-32 h-32 rounded-full mr-4 object-cover"
                />
              </div>
            )}
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-3 mt-4 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
