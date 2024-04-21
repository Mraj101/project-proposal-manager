import React, { useState, useEffect } from "react";
import Proposal from "../components/Proposal";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const StudentPanel = () => {
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
                  <td>
                    <button className="bg-slate-300 px-4 py-2 rounded-lg text-slate-100 font-extrabold">
                      {proposal.isAccepted === false &&
                      proposal.isRejected === false &&
                      proposal.isAccepetedByHOD === false
                        ? "pending"
                        : "accepted"}
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        </>
      )}
    </>
  );
};

export default StudentPanel;
