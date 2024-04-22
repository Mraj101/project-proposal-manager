import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const StudentPanel = () => {
  const [proposals, setProposals] = useState([]);
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const fetchProposals = async (receivedUsr) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/proposals/get",
        receivedUsr
      );
      const { data } = response.data;
      setProposals(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) {
      setUsr(userDataFromStorage);
    }
  }, []);

  useEffect(() => {
    fetchProposals(usr);
  }, [usr]);

  const demoProposals=[
    {
        "_id": "66261c31b8a61b3f2521f85e",
        "username": "nu",
        "email": "nu@gmail.com",
        "password": "$2b$10$9muayP3XTFhynh.B7q2t3.a/Mju9UnYg.RtyoNGhMhBcC17.ggG72",
        "img": "http://res.cloudinary.com/dwq8fbgmg/image/upload/v1713762582/xemhwyvexxkehsck5uwb.jpg",
        "userId": "111",
        "session": null,
        "department": "cse",
        "position": "2",
        "gender": "male",
        "createdAt": "2024-04-22T08:13:37.955Z",
        "updatedAt": "2024-04-22T08:13:37.955Z",
        "__v": 0,
        "projectTitle": "sdfdsf",
        "description": "dfdfdf",
        "abstract": "dfdfdfdf",
        "file": "http://res.cloudinary.com/dwq8fbgmg/image/upload/v1713773617/ksqbhfndre4a3hakcjy3.pdf",
        "user": "6625f1163ea8bc87b341c22e"
    }
]
  return (
    <>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="w-full relative">
            <img
              src="https://images.unsplash.com/photo-1507537509458-b8312d35a233?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full h-[400px] object-cover"
              alt="Not Found"
            />
            <div className="absolute inset-0 bg-black opacity-50 "></div>
            <h1 className="text-center text-8xl font-extrabold text-slate-100 absolute top-40 left-[310px] border-2 rounded-lg border-slate-100 px-4 py-2">
              Student's Panel
            </h1>
            <div className="absolute inset-0 bg-black opacity-30 "></div>
          </div>

          <div className="m-5">
            <p className="font-semibold mb-2">Show demo proposals:</p>
            <div className="grid grid-cols-3 gap-4">
              {demoProposals.map((demoProposal, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {demoProposal.projectTitle}
                  </h3>
                  <p className="mb-2">
                    Description: {demoProposal.description}
                  </p>
                  <p className="mb-2">Abstract: {demoProposal.abstract}</p>
                  <p className="mb-2">
                    File:{" "}
                    <a
                      href={demoProposal.file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </p>
                  <p className="mb-2">User Name: {demoProposal.username}</p>
                  <p className="mb-2">User ID: {demoProposal.userId}</p>
                  <p className="mb-2">Department: {demoProposal.department}</p>
                  {/* Add more details as needed */}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto mx-10 my-10 border-2 rounded-lg">
            <table className="table">
              <thead className="border-b-2">
                <tr>
                  <th>User Name</th>
                  <th>User Id</th>
                  <th>Deparment</th>
                  <th>Project Title</th>
                  <th>File</th>
                  <th>Proposal Sending Date</th>
                  <th>Supervisor Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr key={proposal._id}>
                    <td>{proposal.username}</td>
                    <td>{proposal.userId}</td>
                    <td>{proposal.department}</td>
                    <td>{proposal.projectTitle}</td>
                    <td>{proposal.file}</td>
                    <td>{proposal.createdAt.split("T")[0]}</td>
                    <td>{proposal.supervisorName}</td>
                    <td>
                      <button className="bg-slate-300 px-4 py-2 rounded-lg text-slate-100 font-extrabold">
                        {proposal.isAccepted === false &&
                        proposal.isRejected === false &&
                        proposal.isAccepetedByHOD === false
                          ? "Pending"
                          : "Accepted"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default StudentPanel;
