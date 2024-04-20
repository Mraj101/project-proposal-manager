import React, { useState, useEffect } from "react";
import Proposal from "../components/Proposal";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [proposals, setProposals] = useState([]);
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const fetchProposals = async (receivedUsr) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/proposals/get", receivedUsr);
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

  return (
    <>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1">
        {proposals.map((proposal) => (
          <Proposal
            key={proposal._id}
            description={proposal.description}
            file={proposal.file}
            projectTitle={proposal.projectTitle}
            supervisorId={proposal.supervisorId}
            user={proposal.user}
            userImage={proposal.userImage}
            userName={proposal.userName}
            createdAt={proposal.createdAt}
            updatedAt={proposal.updatedAt}
          />
        ))}
      </div>
      )}
    </>
  );
};

export default Home;
