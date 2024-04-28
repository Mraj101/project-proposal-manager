import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogOut";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { usr, setUsr } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      let isVisible = prevScrollPos > currentScrollPos;
      if (prevScrollPos < 40) isVisible = true;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUsr(stored);
    }
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem('user')
      // await logout();
      window.location.reload()
      navigate('/login')
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  return (
    <div
      className={`z-50 h-20 bg-white x-4 sm:px-6 lg:px-8 py-4 shadow-lg sticky top-0 transition duration-500 ${
        visible ? "" : "transform -translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
    
        <Link to="/">
          <div className="font-bold text-2xl text-slate-600">Project Proposal Manager</div>
        </Link>

        <div className="flex items-center space-x-4">
     
          <Link to="/">
            <button className="border-2 border-blue-800 duration-700 hover:duration-700 hover:border-blue-300 hover:text-blue-300 text-blue-800 rounded-md p-1  px-4 font-bold">
              Home
            </button>
          </Link>

          {usr && (
            <Link to="/create">
              {(usr?.position === "1")?(<button className="border-2 border-blue-800 duration-700 hover:duration-700 hover:border-blue-300 hover:text-blue-300 text-blue-800 rounded-md p-1  px-4 font-bold">
               create proposal
              </button>):null}
            </Link>
          )}
          {usr && (
            <Link to="/createDemo">
              {(usr?.position === "2")?(<button className="border-2 border-blue-800 duration-700 hover:duration-700 hover:border-blue-300 hover:text-blue-300 text-blue-800 rounded-md p-1  px-4 font-bold">
               create demoProposal
              </button>):null}
            </Link>
          )}

          {!usr && (
            <Link to="/login">
              <div>
                <button className="font-semibold border border-gray-200 p-2 rounded-lg shadow-md">
                  Login
                </button>
              </div>
            </Link>
          )}

          {!usr && (
            <Link to="/signup">
              <div>
                <button className="font-semibold border border-gray-200 p-2 rounded-lg shadow-md">
                  Sign up
                </button>
              </div>
            </Link>
          )}

          {usr && (
            <Link to="userProfile">
              <div>
                <img
                  className="h-10 w-10 shadow-lg border border-gray-300 rounded-full object-cover"
                  src={usr.img}
                  alt="User Profile"
                />
              </div>
            </Link>
          )}

          {usr && (
            <button
              onClick={handleLogout}
              className="font-thin border border-gray-200 p-2 rounded-lg shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;