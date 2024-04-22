import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const HodPanel = () => {
  const [proposals, setProposals] = useState([]);
  const { usr, setUsr } = useAuthContext();

  const fetchProposals = async () => {
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
      const response = await axios.post(
        `http://localhost:8000/api/v1/proposals/updatebyhod/${proposalId}`,
        { isAccepetedByHOD: true }
      );
      const updatedProposal = response.data;
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal._id === updatedProposal._id ? updatedProposal : proposal
        )
      );
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  }; 
  


  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) {
      setUsr(userDataFromStorage);
    }
  }, []);

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div>
      <div className="w-full relative">
        <img
          src="https://media.istockphoto.com/id/1423164674/photo/african-american-female-teacher-in-school-hallway.webp?b=1&s=170667a&w=0&k=20&c=wTc3pp3Aq470DdWJT9pFpWEFkWfjxXCYO7ITfQ6y37I="
          className="w-full h-[400px] object-cover"
          alt="Not Found"
        />
        <div className="absolute inset-0 bg-black opacity-50 "></div>
        <h1 className="text-center text-8xl font-extrabold text-slate-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-lg border-slate-100 px-4 py-2">
          Dept Head
        </h1>
        <div className="absolute inset-0 bg-black opacity-30 "></div>
      </div>

      <div className="overflow-x-auto mx-10 my-10 border-2 rounded-lg">
        <table className="table">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>Project Title</th>
              <th>Project Description</th>
              <th>File</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal._id}>
                <td>{proposal.username}</td>
                <td>{proposal.projectTitle}</td>
                <td>{proposal.description}</td>
                <td>{proposal.file.substring(0, 10)}</td>
                <td>{proposal.createdAt.split('T')[0]}</td>
                <td>
                  {(proposal.isAccepted  &&
                    proposal.isAccepetedByHOD) ? 
                      (<span className="px-4 py-2 rounded-lg bg-green-400 text-white">
                        Approved
                      </span>
                  ) : (
                    <div className="flex gap-5">
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-400 text-white"
                        onClick={() => handleAcceptProposal(proposal._id)}
                      >
                        ✔️ Accept
                      </button>
                      <button  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400 text-white">
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HodPanel;
