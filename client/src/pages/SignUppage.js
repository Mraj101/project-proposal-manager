import axios from "axios";
import { useState } from "react";
import StudentSignup from "./StudentSignup";
import TeacherSignup from "./TeacherSignup";
const Signup = () => {
  const [role, setRole] = useState(""); // New state variable to track selected role
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const renderSignupForm = () => {
    if (role === "student") {
      return <StudentSignup />;
    } else if (role === "teacher") {
      return <TeacherSignup />;
    }else {
      return null;
    }
  };



  return (
    <div className="signup-container flex items-center justify-center min-h-screen">
      <div className="signup-content text-center max-w-screen-md w-full mx-auto">
        <h3 className="text-2xl font-semibold mt-6 text-blue-500">Sign Up</h3>
        <form className="bg-white p-6 rounded-lg">
          {/* Role Selection */}
          <div className="mb-6 flex items-center">
            <label htmlFor="role" className="text-sm font-bold text-gray-700 mr-4 w-1/4">
              Sign up as:
            </label>
            <select
              id="role"
              className="w-3/4 px-4 py-3 text-lg border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleRoleChange}
              value={role}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          {/* Render Signup Form based on selected role */}
          {renderSignupForm()}
        </form>
      </div>
    </div>
  );
};


// const TeacherSignup = () => {
//   // Your teacher signup form JSX
// };

export default Signup;
