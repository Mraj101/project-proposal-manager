import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CustomLoader from "./CustomLoader";

const HodPanel = () => {
  const [proposals, setProposals] = useState([]);
  const { usr, setUsr } = useAuthContext();
  const [loading,setLoading]= useState(false);


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
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/api/v1/proposals/updatebyhod/${proposalId}`,
        { isAccepetedByHOD: true }
      );
      
      const updatedProposal = response.data.data;
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal._id === updatedProposal._id ? updatedProposal : proposal
        )
      );

      setLoading(false);
      toast.success('Accepted proposal by Hod Successfull')
    } catch (error) {
      setLoading(false);
      console.error("Error accepting proposal:", error);
    }
  };

  const handleRejectProposal = async (proposalId) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `http://localhost:8000/api/v1/proposals/rejectedbyhod/${proposalId}`,
        { isRejectedByHOD: true }
      );
      const updatedProposal = response.data.data;
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal._id === updatedProposal._id ? updatedProposal : proposal
        )
      );
      setLoading(false);
      toast.error(' proposal rejected by Hod')
    } catch (error) {
      setLoading(false)
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
          Department Head
        </h1>
        <div className="absolute inset-0 bg-black opacity-30 "></div>
      </div>

      <div className="overflow-x-auto mx-10 my-10 border-2 rounded-lg">
        <table className="table">
          <thead className="border-b-2">
            <tr>
              <th>User Name</th>
              <th>User Id</th>
              <th>Deparment</th>
              <th>Project Title</th>
              <th>Project Details</th>
              <th>File</th>
              <th>Proposal Sending Date</th>
              <th>Supervisor Name</th>
              <th>Supervisor Approval</th>
              <th>Action</th>
              <th>HOD Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal) => (
              <tr key={proposal?._id}>
                <td>{proposal?.username}</td>
                <td>{proposal?.userId}</td>
                <td>{proposal?.department}</td>
                <td>{proposal?.projectTitle}</td>
                <td>{proposal?.description}</td>
                <td>{proposal?.file.substring(0, 10)}</td>
                <td>{proposal?.createdAt.split("T")[0]}</td>
                <td>{proposal?.supervisorName}</td>
                <td>
                  {proposal?.isAccepted === true && (
                    <span className="px-4 py-2 rounded-lg bg-green-400 text-white">
                      Approved
                    </span>
                  )}

                  {proposal?.isAccepted === false &&
                    proposal?.isRejected === false && (
                      <span className="px-4 py-2 rounded-lg bg-yellow-400 text-white">
                        pending
                      </span>
                    )}

                  {proposal?.isRejected === true && (
                    <span className="px-4 py-2 rounded-lg bg-red-400 text-white">
                      rejected
                    </span>
                  )}
                </td>
                <td>
                  {((proposal?.isRejected === false &&
                    proposal.isAccepted === false) || (proposal?.isAccepetedByHOD === true && proposal?.isAccepted === true) || (proposal?.isRejected === true && proposal?.isRejectedByHOD === true) || (proposal?.isRejected === true && proposal?.isAccepted === false && proposal?.isAccepetedByHOD === false && proposal?.isRejectedByHOD === false) || (proposal?.isAccepted === true && proposal?.isRejectedByHOD === true && proposal?.isAccepetedByHOD === false)) && (
                      <div className="flex gap-5">
                        <button
                          className="flex items-center gap-2 py-2 rounded-lg bg-slate-200 px-4 text-white hover:cursor-default"
                          // onClick={() => handleAcceptProposal(proposal?._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="flex items-center gap-2 py-2 rounded-lg bg-slate-200 px-4 text-white hover:cursor-default"
                          // onClick={() => handleRejectProposal(proposal?._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}

                  {(proposal?.isAccepted === true && proposal?.isAccepetedByHOD === false && proposal?.isRejectedByHOD === false) && (
                    <div className="flex gap-5">
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-400 text-white"
                        onClick={() => handleAcceptProposal(proposal?._id)}
                      >
                        ✔️ Accept
                      </button>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-400 text-white"
                        onClick={() => handleRejectProposal(proposal?._id)}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {proposal?.isAccepted && proposal?.isAccepetedByHOD && (
                    <span className="px-4 py-2 rounded-lg bg-green-400 text-white">
                      Approved
                    </span>
                  )}

                  {(proposal?.isAccepted === false && proposal?.isRejected === false && proposal?.isAccepetedByHOD === false && proposal?.isRejectedByHOD === false) && (
                    <span className="px-4 py-2 rounded-lg bg-yellow-400 text-white">
                    Pending
                  </span>
                  )}

                  {(proposal?.isAccepted === true && proposal?.isRejected === false && proposal?.isAccepetedByHOD === false && proposal?.isRejectedByHOD === false) && (
                    <span className="px-4 py-2 rounded-lg bg-yellow-400 text-white">
                    pending
                  </span>
                  ) }

                  {
                    proposal?.isRejected && (
                      <span className="px-4 py-2 rounded-lg bg-red-400 text-white">
                      Rejected
                    </span>
                    )
                  }

                  {/* {(proposal?.isAccepted === true ||
                    proposal?.isRejected === true) && (
                    <span className="px-4 py-2 rounded-lg bg-slate-400 text-white">
                      pending
                    </span>
                  )} */}

                  {proposal?.isAccepted === true &&
                    proposal?.isRejectedByHOD === true && (
                      <span className="px-4 py-2 rounded-lg bg-red-400 text-white">
                        rejected
                      </span>
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

export default HodPanel;