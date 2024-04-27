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

          <div className="my-5">
            <label className="input input-bordered flex items-center gap-2 w-72 mx-auto">
              <input type="text" className="grow" placeholder="Search" />
              <span className="badge badge-info"></span>
            </label>
          </div>

          <div className="my-2">
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
                    src="data:image/png;base64,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"
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
            <h2 className="mt-20 underline text-center text-3xl font-bold tracking-widest">
              Student Proposals List
            </h2>
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
                            : proposal.isAccepted && proposal.isAccepetedByHOD
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
