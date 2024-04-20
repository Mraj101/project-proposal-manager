import React, { useState } from "react";
import axios from "axios";

const TeacherSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [session, setSession] = useState("");
  const [department, setDepartment] = useState("");
  const [teacherId, setTeacherId] = useState(""); // New state variable
  const [gender, setGender] = useState(""); // New state variable

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
    formData.append("registrationNumber", registrationNumber);
    formData.append("session", session);
    formData.append("department", department);
    formData.append("teacherId", teacherId); // Append teacherId to FormData
    formData.append("gender", gender); // Append gender to FormData

    try {
      const res = await axios.post("http://localhost:8000/api/v1/newuser/crt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User created successfully:", res.data);
      // Reset form fields and state variables
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setImage(null);
      setImagePreview(null);
      setPasswordsMatch(true);
      setRegistrationNumber("");
      setSession("");
      setDepartment("");
      setTeacherId(""); // Clear teacherId field
      setGender(""); // Clear gender field
    } catch (error) {
      console.log("Error occurred while creating user:", error);
    }
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
        <h3 className="text-2xl font-semibold mt-6 text-blue-500">Teacher Sign Up Form</h3>
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
          {/* Profile Picture */}
          {/* This field remains the same as in the student signup */}
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
          {/* Teacher ID */}
          <div className="mb-6 flex items-center">
            <label htmlFor="teacherId" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Teacher ID:
            </label>
            <input
              id="teacherId"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setTeacherId(e.target.value)}
              value={teacherId}
              placeholder="Enter your teacher ID"
              required
            />
          </div>
          {/* Gender */}
          <div className="mb-6 flex items-center">
            <label className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Gender:
            </label>
            <label htmlFor="male" className="mr-2">
              <input
                id="male"
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>
            <label htmlFor="female" className="mr-2">
              <input
                id="female"
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
            <label htmlFor="other">
              <input
                id="other"
                type="radio"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Other
            </label>
          </div>

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

export default TeacherSignup;
