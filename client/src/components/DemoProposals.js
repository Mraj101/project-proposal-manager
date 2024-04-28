import React from "react";

const DemoProposals = ({ demoProposal }) => {
  const { projectTitle, username, description, file, createdAt } = demoProposal;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-gray-200">
      <div className="relative">
        <img
          src="https://e7.pngegg.com/pngimages/943/136/png-clipart-pdf-thumbnail-computer-icons-pdf-pdf-miscellaneous-angle-thumbnail.png"
          alt={username}
          className="w-full h-36 object-cover object-center"
        />
        <div className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 rounded-tr-lg">
          <span className="text-xs font-semibold">New</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{projectTitle}</h3>
        <p className="text-gray-600 mb-4">Submitted by: {username}</p>
        <p className="text-gray-700 mb-6">{description}</p>
        <a
          href={`http://localhost:8000/files/${file}`}
          className="text-blue-500 hover:underline block mb-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Document
        </a>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500">Submitted on: {formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default DemoProposals;
