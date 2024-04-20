import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Proposal = ({
  title,
  description,
  file,
  projectTitle,
  supervisorId,
  user,
  userImage,
  userName,
  createdAt,
}) => {
  const { usr, setUsr } = useAuthContext();

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    setUsr(userDataFromStorage);
  }, []);

  return (
    <div className="px-20 my-3 border border-black">
      <div className="h-auto md:h-64 w-full md:w-auto bg-white flex flex-col md:flex-row justify-between items-center border border-gray-300 shadow-lg rounded-md p-4">
        <div className="flex flex-col md:flex-row justify-between w-full md:w-auto">
          <div className="flex gap-2 items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={userImage}
              alt="User"
            />
            <span className="mt-2">{userName}</span>
          </div>

          <div className="flex flex-col justify-between md:ml-8 mt-4 md:mt-0">
            <h2 className="text-xl font-bold mb-3">{projectTitle}</h2>
            <p className="text-gray-600">
              {description.length > 200
                ? `${description.substring(0, 200)}...`
                : description}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center mt-4 md:mt-0 md:ml-8">
          <div>
            Created At: <span>{createdAt.split("T")[0]}</span>
          </div>
          {/* Here, I'm using an iframe to display the PDF or other file */}
          <iframe
            title={title}
            src={file}
            className="w-64 h-64 mt-4"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default Proposal;
