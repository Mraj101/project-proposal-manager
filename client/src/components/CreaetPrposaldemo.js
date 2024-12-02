import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CreaetPrposaldemo = () => {
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    if (name === "file") {
      setFileSelected(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formInstance = new FormData();
    formInstance.append("title", formData.title);
    formInstance.append("abstract", formData.abstract);
    formInstance.append("description", formData.description);
    formInstance.append("file", formData.file);
    formInstance.append("user", usr._id);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/proposals/crtdemo",
        formInstance,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "new proposal created");
      setLoading(false);
      // Reset form data after successful submission
      setFormData({
        title: "",
        abstract: "",
        description: "",
        file: null,
      });
      // Reset fileSelected state
      setFileSelected(false);
      if (response?.data?.success === true) {
        navigate('/supervisor');
        return Swal.fire("Demo Proposal Submitted Successfully ");
      }
      } catch (error) {
        console.error("Error creating proposal:", error);
        setLoading(false);
      }
    };

    return (
      <div className="w-full px-4 py-8 flex items-center justify-center">
        <div className="max-w-xl w-full p-5 rounded-lg border border-gray-200 shadow-xl bg-white overflow-y-auto">
          <h1 className="text-3xl font-semibold text-center mb-2">
            Create a New Proposal
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-medium mb-2">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="abstract"
                className="block text-lg font-medium mb-2"
              >
                Abstract
              </label>
              <textarea
                id="abstract"
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-2"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                rows="6"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-lg font-medium mb-2">
                Upload File (doc, pdf, etc.)
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".doc,.docx,.pdf"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:border-blue-500"
                required
              />
              {fileSelected ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="green"
                  className="w-6 h-6 mt-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Create Proposal
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default CreaetPrposaldemo;
