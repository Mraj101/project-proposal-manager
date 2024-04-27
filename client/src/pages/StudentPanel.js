import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const StudentPanel = () => {
  const [proposals, setProposals] = useState([]);
  const [demoProposals, setDemoProposals] = useState([]);
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

  const fetchDemoProposals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/proposals/getdemo"
      );
      const { data } = response.data;
      setDemoProposals(data);
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
    fetchDemoProposals();
  }, [usr]);

  const getStatusColor = (proposal) => {
    if (proposal.isAccepted && proposal.isAccepetedByHOD) {
      return "bg-green-500";
    } else if (proposal.isRejected || proposal.isRejectedByHOD) {
      return "bg-red-500";
    } else {
      return "bg-slate-300";
    }
  };

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

    
          <div className="m-20">
            <h1 className="font-bold text-3xl text-center underline">
              Previously submitted proposals
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {demoProposals.map((demoProposal) => (
                <div
                  key={demoProposal._id}
                  className="bg-white overflow-hidden shadow-md rounded-lg"
                >
                  <img 
                    src=""
                    alt={demoProposal.username}
                    className="mx-auto"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {demoProposal.projectTitle}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Submitted by: {demoProposal.username}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {demoProposal.description}
                    </p>
                    <a
                      href={`http://localhost:8000/files/${demoProposal.file}`}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>

                  </div>
                  <div className="p-4 bg-gray-100 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Submitted on: {demoProposal.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
          <h2 className="mt-20 underline text-center text-3xl font-bold tracking-widest">Student Proposals List</h2>
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
                      <td>
                        <a
                          href={`http://localhost:8000/files/${proposal.file}`}
                        >
                          view document
                        </a>
                      </td>
                      <td>{proposal.createdAt.split("T")[0]}</td>
                      <td>{proposal.supervisorName}</td>
                      <td>
                      <button
                          disabled
                          className={`px-4 py-2 rounded-lg font-extrabold text-slate-100 ${getStatusColor(
                            proposal
                          )}`}
                        >
                          {proposal.isRejected
                            ? "Rejected"
                            : proposal.isAccepted &&
                              proposal.isAccepetedByHOD
                            ? "Accepted"
                            : proposal.isAccepted && proposal.isRejectedByHOD
                            ? "Rejected"
                            : "Pending"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentPanel;