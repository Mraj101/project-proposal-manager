import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CustomLoader from "./CustomLoader";

// import { ToastContainer, toast } from 'react-toastify';

const SuperVisorPanel = () => {
  const [proposals, setProposals] = useState([]);
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const fetchProposals = async (receivedUsr) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/proposals/get"
      );
      setProposals(response.data.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      setLoading(true);
      toast.success("Accepted proposal");
      const response = await axios.post(
        `http://localhost:8000/api/v1/proposals/update/${proposalId}`,
        { isAccepted: true }
      );
      const updatedProposal = response.data.data;
      console.log(updatedProposal);
      setProposals((prev) =>
        prev.map((proposal) =>
          proposal._id === updatedProposal._id ? updatedProposal : proposal
        )
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error accepting proposal:", error);
    }
  };

  const handleRejectProposal = async (proposalId) => {
    try {
      setLoading(true);
      toast.error("Rejected proposal");
      const response = await axios.post(
        `http://localhost:8000/api/v1/proposals/rejected/${proposalId}`,
        { isRejected: true }
      );
      const updatedProposal = response.data.data;
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal._id === updatedProposal._id ? updatedProposal : proposal
        )
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error rejecting proposal:", error);
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

  return (
    <div className="">
      <div className="w-full relative">
        <img
          src="https://images.unsplash.com/photo-1643877323040-ebf5c69961dd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-[400px] object-cover"
          alt="Not Found"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-center text-8xl font-extrabold text-slate-100 absolute top-40 left-[340px] border-2 rounded-lg border-slate-100 px-4 py-2">
          Supervisor's Panel
        </h1>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="overflow-x-auto mx-10 my-10 border-2 rounded-lg">
        <table className="table">
          <thead className="border-b-2">
            <tr>
              <th>User Name</th>
              <th>User Id</th>
              <th>Gender</th>
              <th>Session</th>
              <th>Department</th>
              <th>Project Title</th>
              <th>Project Details</th>
              <th>File</th>
              <th>Proposal Sending Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal._id}>
                <td>{proposal.username}</td>
                <td>{proposal.userId}</td>
                <td>{proposal.gender}</td>
                <td>{proposal.session}</td>
                <td>{proposal.department}</td>
                <td>{proposal.projectTitle}</td>
                <td>{proposal.description}</td>
                <td>{proposal.file.substring(0, 10)}</td>
                <td>{proposal.createdAt.split("T")[0]}</td>
                <td colSpan={proposal.isAccepted ? "2" : "1"}>
                  {proposal.isAccepted ? (
                    <span className="px-4 py-2 rounded-lg bg-blue-400 text-white">
                      Sent to HOD
                    </span>
                  ) : proposal.isRejected ? (
                    <span className="px-4 py-2 rounded-lg bg-red-400 text-white">
                      Rejected
                    </span>
                  ) : (
                    <div className="flex gap-5">
                      {loading ? (
                        <CustomLoader />
                      ) : (
                        <>
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-400 text-white"
                            onClick={() => handleAcceptProposal(proposal._id)}
                          >
                            ✔️ Accept
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400 text-white"
                            onClick={() => handleRejectProposal(proposal._id)}
                          >
                            ❌ Reject
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SuperVisorPanel;
