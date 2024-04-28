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
  const [pageloading, setPageLoading] = useState(false);

  const fetchProposals = async (receivedUsr) => {
    try {
      setPageLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/proposals/get"
      );
      setProposals(response.data.data);
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      console.error("Error fetching proposals:", error);
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    try {
      setLoading(true);
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
      toast.success("Accepted proposal");
    } catch (error) {
      setLoading(false);
      console.error("Error accepting proposal:", error);
    }
  };

  const handleRejectProposal = async (proposalId) => {
    try {
      setLoading(true);
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
      toast.error("Rejected proposal");
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
    <>
      {pageloading ? (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
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
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            <>
                              <button
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-400 text-white"
                                onClick={() =>
                                  handleAcceptProposal(proposal._id)
                                }
                              >
                                ✔️ Accept
                              </button>
                              <button
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400 text-white"
                                onClick={() =>
                                  handleRejectProposal(proposal._id)
                                }
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

          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
      )}
    </>
  );
};

export default SuperVisorPanel;
