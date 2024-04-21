import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

const SuperVisorPanel = () => {
  const [proposals, setProposals] = useState([]);
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const fetchProposals = async (receivedUsr) => {
    try {
      const response = await axios.get(
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
        `http://localhost:8000/api/v1/proposals/update/${proposalId}`,
        { isAccepted: true }
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
    fetchProposals(usr);
  }, [usr]);

  return (
    <div className="">
      <div className="overflow-x-auto mx-10 my-10 border-2 rounded-lg">
        <table className="table">
          <thead className="border-b-2">
            <tr>
              <th>Project Title</th>
              <th>File</th>
              <th>Proposal Sending Date</th>
              <th>Confirm</th>
              <th>Not Confirm</th>
              <th>userName</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal._id}>
                <td>{proposal.projectTitle}</td>
                <td>{proposal.file}</td>
                <td>{proposal.createdAt}</td>
                <td className="flex gap-5">
                  {/* Accept button */}
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-400 text-white"
                    onClick={() => handleAcceptProposal(proposal._id)}
                  >
                    ✔️ Accept
                  </button>
                </td>
                <td>
                  {/* Reject button */}
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400 text-white">
                    ❌ Reject
                  </button>
                </td>
                <td>{proposal.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperVisorPanel;
