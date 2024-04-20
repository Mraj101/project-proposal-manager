import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyText, setReplyText] = useState("");
  const { usr, setUsr } = useAuthContext();
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const blogResponse = await axios.get(
        `http://localhost:8000/api/v1/blogs/getSingle/${id}`
      );
      setBlog(blogResponse.data);

      const commentsResponse = await axios.get(
        `http://localhost:8000/api/v1/comments/getComments/${id}`
      );
      setComments(commentsResponse.data.data);

      const views = await axios.post(
        `http://localhost:8000/api/v1/viewcount/update/${id}`,
        {
          loggedInUser: usr._id,
        }
      );
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  // useEffect(() => {

  // });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUsr(stored);
    }
    fetchBlog();
  }, []);

  const handleCommentChange = (event) => {
    console.log("handle");
    setCommentInput(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      if (commentInput.trim() !== "") {
        const commentData = {
          blogId: id,
          user: usr._id,
          comment: commentInput,
          replies: [],
        };

        const response = await axios.post(
          "http://localhost:8000/api/v1/comments/crt",
          commentData
        );
        setComments((prev) => [...prev, response.data.data]);
        setCommentInput("");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleReply = (index) => {
    setReplyIndex(index);
    setReplyText("");
  };

  const handleReplySubmit = async () => {
    if (replyText.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[replyIndex].replies.push(replyText);
      try {
        await axios.put(
          `http://localhost:8000/api/v1/comments/update/${id}`,
          updatedComments
        );
      } catch (error) {
        console.log("Error updating comments:", error);
      }

      setComments(updatedComments);
      setReplyIndex(null);
      setReplyText("");
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 w-[80%]">
      <div className="flex items-center mb-4">
        <img
          src={blog.data.userImg}
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <p className="text-lg font-semibold underline">
            {blog.data.username}
          </p>
          {/* Assuming the user's name is available in user.name */}
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">{blog.data.title}</h1>

      <img
        src={blog.data.img}
        alt=""
        className="w-full h-[500px] object-cover rounded-lg mb-4"
      />

      <div className="text-lg text-gray-700 mb-8">{blog.data.content}</div>

      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="flex mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            placeholder="Write your comment..."
            value={commentInput}
            onChange={handleCommentChange}
          ></textarea>
          <button
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
        </div>

        {/* Comments List */}
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mb-4">
              <div className="flex justify-between relative">
                <div className="flex gap-5">
                  <div>
                    <img
                      className="h-8 w-8 object-cover rounded-full "
                      src={usr.img}
                      alt=""
                    />
                    <span className=" underline">{usr.userName}</span>
                  </div>
                  <p className="text-black absolute top-1 left-10">
                    {comment.comment}
                  </p>
                </div>
                <button
                  className="text-blue-500"
                  onClick={() => handleReply(index)}
                >
                  Reply
                </button>
              </div>
              {replyIndex === index && (
                <div className="ml-8 mt-2">
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 resize-none"
                    placeholder="Write your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                  <button
                    className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    onClick={handleReplySubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
              <ul>
                {comment.replies &&
                  comment.replies.map((reply, replyIndex) => (
                    <li key={replyIndex} className="text-gray-500 ml-6">
                      {reply}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleBlog;
