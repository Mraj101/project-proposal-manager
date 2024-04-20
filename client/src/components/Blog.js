import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const Blog = ({
  title,
  content,
  imageUrl,
  blogId,
  userImage,
  userName,
  createdAt,
  count,
}) => {
  const { usr, setUsr } = useAuthContext(AuthContext);

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    setUsr(userDataFromStorage);
  }, []);


  return (
    <div className="container px-20 my-3 w-full">
      <div className="h-64 w-32 md:w-auto  bg-white flex justify-between border border-gray-300 shadow-lg rounded-md p-4">
        <div className="flex flex-col justify-between ">
          <div className="flex gap-2">
            <img
              className="h-10 w-10 border border-black rounded-full object-cover"
              src={userImage}
              alt="alt"
            />
            <span className="mt-2">{userName}</span>
          </div>

          <div className="flex flex-col justify-between mr-8">
            <h2 className="text-xl font-bold mb-5">{title?.toUpperCase()}</h2>
            <p className="text-gray-600">
              {" "}
              {content.length > 200
                ? `${content.substring(0, 200)}...`
                : content}
            </p>
          </div>
          <div className="flex items-center relative">
            <Link
              to={`/blogs/${blogId}`}
              className=" text-lg text-blue-500 hover:underline mt-2"
            >
              Read more
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 absolute left-32 top-3 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span className="absolute left-[150px] top-2 text-gray-500">
              {count}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center">
          <div>
            Blog Created:<span>{createdAt.split("T")[0]}</span>
          </div>
          <img
            src={imageUrl}
            alt={title}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;