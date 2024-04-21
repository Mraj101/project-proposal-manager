import Hero from "../pages/Hero";

const HodPanel = () => {
  return (
    <div className="">
            <p>Hod panel</p>
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
              <th>Student's Name</th>
              <th>Project Title</th>
              <th>File</th>
              <th>Proposal Sending Date</th>
              <th>Confirm</th>
              <th>Not Confirm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Miraj Hossain</td>
              <td>Project Proposal Management</td>
              <td>management.pdf</td>
              <td>2024/04/18</td>
              <td className="flex gap-5">
                <button className="px-4 py-2 rounded-lg text-green-400 font-extrabold">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-green-600 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </button> 
                </td>
                <td>
                <button className="px-4 py-2 rounded-lg text-green-400 font-extrabold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Mahisur Rahman</td>
              <td>Project Proposal Management</td>
              <td>management.pdf</td>
              <td>2024/04/20</td>
              <td className="flex gap-5">
                <button className="px-4 py-2 rounded-lg text-green-400 font-extrabold">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-green-600 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </button> 
                </td>
                <td>
                <button className="px-4 py-2 rounded-lg text-green-400 font-extrabold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>

          {/* Dynamic Data will go Here*/}
          {/* {proposals.map((proposal) => (
              <tbody>
                <tr>
                  <td>{proposal.userName}</td>
                  <td>{proposal.projectTitle}</td>
                  <td>{proposal.file}</td>
                  <td>{proposal.createdAt.split("T")[0]}</td>
                  <td><button className="bg-slate-300 px-4 py-2 rounded-lg text-slate-100 font-extrabold">{(proposal.isAccepted === false && proposal.isRejected === false && proposal.isAccepetedByHOD === false) ? "pending" : "accepted"}</button></td>
                </tr>
              </tbody>
            ))} */}
        </table>
      </div>
    </div>
  );
};

export default HodPanel;