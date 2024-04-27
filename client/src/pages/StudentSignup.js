import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";



const StudentSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userId, setuserId] = useState(""); 
  const [session, setSession] = useState(""); 
  const [department, setDepartment] = useState(""); 
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("1");
  const navigate = useNavigate();

if(loading){
  return (
  <div className="flex justify-center items-center">
    <div role="status">
    <svg aria-hidden="true" class="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/> 
    </svg>
    <span class="sr-only">Loading...</span>
</div>
  </div>
  )
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("img", image);
    formData.append("userId", userId); // Append new fields to FormData
    formData.append("session", session);
    formData.append("department", department);
    formData.append("position", position);
    formData.append("gender", gender); 
    

    try {
      const res = await axios.post("http://localhost:8000/api/v1/newuser/crt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(res?.data?.success=== true, "RRESPONSEEEEEEE");

      if(res?.data?.success=== true){
        Swal.fire("Successfully Signed Up");
        navigate('/login');
      }
    
    } catch (error) {
      console.log("Error occurred while creating user:", error);
    }

    // Reset form fields and state variables
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setImage(null);
    setImagePreview(null);
    setPasswordsMatch(true);
    setuserId("");
    setSession("");
    setDepartment("");

    setLoading(false);
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
            <label htmlFor="userId" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Student ID :
            </label>
            <input
              id="userId"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              onChange={(e) => setuserId(e.target.value)}
              value={userId}
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
