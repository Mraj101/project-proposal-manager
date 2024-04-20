
import React, { useState, useEffect } from "react";
import Proposal from "../components/Proposal";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [proposals, setProposals] = useState([]);
  console.log(proposals);
  const { usr, setUsr } = useAuthContext();
  const [isStatus, setIsStatus] = useState("");
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

      // if(proposals?.isAccepted === false && proposals?.isRejected === false && proposals?.isAccepetedByHOD === false){
      //   setIsStatus("Pending");
      // }else{
      //   setIsStatus("Accepted");
      // }
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
        <div className="overflow-x-auto mx-10 my-10 border-2 rounded-lg">
          <table className="table">
            <thead className="border-b-2">
              <tr>
                <th>User Name</th>
                <th>Project Title</th>
                <th>File</th>
                <th>Proposal Sending Date</th>
                <th>Status</th>
              </tr>
            </thead>
            {proposals.map((proposal) => (
              <tbody>
                <tr>
                  <td>{proposal.userName}</td>
                  <td>{proposal.projectTitle}</td>
                  <td>{proposal.file}</td>
                  <td>{proposal.createdAt.split("T")[0]}</td>
                  <td><button className="bg-slate-300 px-4 py-2 rounded-lg text-slate-100 font-extrabold">{(proposal.isAccepted === false && proposal.isRejected === false && proposal.isAccepetedByHOD === false) ? "pending" : "accepted"}</button></td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        //   <div className="grid grid-cols-1">
        //     {proposals.map((proposal) => (
        //     <Proposal
        //       key={proposal._id}
        //       description={proposal.description}
        //       file={proposal.file}
        //       projectTitle={proposal.projectTitle}
        //       supervisorId={proposal.supervisorId}
        //       user={proposal.user}
        //       userImage={proposal.userImage}
        //       userName={proposal.userName}
        //       createdAt={proposal.createdAt}
        //       updatedAt={proposal.updatedAt}
        //     />
        //   ))}
        // </div>
      )}
    </>
  );
};

export default Home;