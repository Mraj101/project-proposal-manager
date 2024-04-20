import { Link } from "react-router-dom";

const SupervisorProfile = () => {
  return (
    <div className=" text-slate-950 mx-10 my-10 border-2 rounded-lg px-80 py-10">
      <div>
        <h1 className="text-center mb-10 font-extrabold text-slate-950 text-4xl underline font-poppins">
          Supervisor's Profile
        </h1>
        <div className="flex justify-between">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img
                className="object-cover"
                src="https://images.unsplash.com/photo-1712847333437-f9386beb83e4?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="not Found"
              />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-2xl text-slate-950 font-extrabold my-2">
              Supervisor Name:{" "}
              <span className="font-light">{"Abdul Hamid"}</span>
            </h1>
            <h1 className="text-2xl text-slate-950 font-extrabold my-2">
              Department: <span className="font-light">{"CSE"}</span>
            </h1>
            <h1 className="text-2xl text-slate-950 font-extrabold my-2">
              Age: <span className="font-light">{"48"}</span>
            </h1>
            <h1 className="text-2xl text-slate-950 font-extrabold my-2">
              Gender: <span className="font-light">{"Male"}</span>
            </h1>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h1 className="text-2xl text-slate-950 font-extrabold my-2">
            Email: <span classname="font-light">{"abdul.hamid@gmail.com"}</span>
          </h1>
          <div className="flex justify-center gap-10">
            <button className="text-xl px-8 py-2 border-2 rounded-lg bg-red-500 tracking-widest font-bold text-slate-100 duration-700 hover:duration-700 hover:scale-110">
              Log Out
            </button>
            <Link to="/supervisor-checklists">
              <button className="text-xl px-8 py-2 border-2 rounded-lg bg-blue-500 tracking-widest font-bold text-slate-100 duration-700 hover:duration-700 hover:scale-110">
                Checklists
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorProfile;