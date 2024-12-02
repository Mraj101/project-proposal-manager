import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading, error } = UseLogin();
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await login(email, password);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
      }
    } catch (error) {
      setLoginError(error.response?.data?.error || "Invalid email or password");
      console.error("Error logging in:", error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center my-2 mx-5 md:mx-0 md:my-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex gap-40 justify-center items-center">
        <div className="w-[40%]">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
          />
        </div>
        <div className="w-[60%]">
          <div className="text-center md:text-left mb-5 font-bold">
            <label className="mr-1">Sign in with</label>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {loginError && (
              <div className="text-red-500 text-sm mb-4">{loginError}</div>
            )}

            {!isLoading ? (
              <button
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                type="submit"
              >
                Log In
              </button>
            ) : (
              <div className="w-full">
                <div role="status" className="mx-auto">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            )}
          </form>
          <div className="mt-4 font-semibold text-sm text-gray-500">
            Don't have an account? <Link to={"/signup"}>Register</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
