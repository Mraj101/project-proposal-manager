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
    <div className="px-20 my-3">
      <div className="h-auto md:h-64 w-full md:w-auto bg-white border border-gray-300 shadow-lg rounded-md p-4 flex">
        <div className="flex flex-col justify-between">
          <div className="flex gap-2 items-center mb-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={userImage}
              alt="User"
            />
            <span className="mt-2">{userName}</span>
          </div>
          <h2 className="text-xl font-bold mb-3">{projectTitle}</h2>
          <a href={description} target="_blank" rel="noopener noreferrer">
            git link
          </a>
        </div>

        <div className="flex flex-col justify-between items-end ml-auto">
          <div className="text-right">
            Created At: <span>{createdAt.split("T")[0]}</span>
          </div>
          <a href={file} target="_blank" rel="noopener noreferrer">
            View Proposal
          </a>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
