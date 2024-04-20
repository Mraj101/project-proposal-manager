import React, { useState, useEffect } from "react";
import Blog from "../components/Blog";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [popularBlogs, setPopularBlogs] = useState([]);
  const { usr, setUsr } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const fetchProposals = async (recievedUsr) => {
    axios
      .post("http://localhost:8000/api/v1/proposals/get",recievedUsr)
      .then((response) => {
        const { data } = response.data;
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userDataFromStorage) {
      setUsr(userDataFromStorage);
    }
  }, []);





  // const popularBLogs = async () => {
  //   // Fetch popular blogs
  //   axios
  //     .get("http://localhost:8000/api/v1/viewcount/getAll")
  //     .then((response) => {
  //       const { data } = response.data;
  //       setPopularBlogs(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching popular blogs:", error);
  //     });
  // };

  useEffect(() => {
    // if (usr) {
    //   axios
    //     .post("http://localhost:8000/api/v1/blogs/get", usr)
    //     .then((response) => {
    //       const { data } = response.data;
    //       setBlogs(data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching blogs:", error);
    //     });
    // } else {}
  
      fetchProposals(usr);
    
    // popularBLogs();
  }, [usr]);

  // const handleClick = async()=>{
  //   try {
  //     const viewResponse = await axios.post(`http://localhost:8000/api/v1/viewcount/update/${}`)
  //   } catch (error) {
  //     console.log(error,'error');
  //   }
  // }

  // console.log(
  //   popularBlogs.map((Singleblog, key) => console.log(Singleblog)),
  //   "here is the pop blogs"
  // );

  console.log(usr,"inside usr")

  return (
    <>
      {loading ? (
        <div
          role="status"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-[70%] flex flex-col justify-center items-center  bg-gray-100 shadow-lg">
            {blogs && (
              <div className="container px-4 py-8 bg-cream">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-1">
                  {blogs.map((blog, index) => (
                    <Blog
                      key={index}
                      title={blog.title}
                      content={blog.content}
                      imageUrl={blog.img}
                      blogId={blog._id}
                      count={blog.count}
                      userImage={blog.userImage}
                      userName={blog.userName}
                      createdAt={blog.createdAt}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* popular blog section */}
          <div className="w-[30%] bg-gray-50">
            <div className="m-12 p-5 rounded-md sticky right-5 top-32 shadow-lg border border-gray-200 ">
              <h1 className="font-bold text-xl mb-4">All reqs</h1>
              <div className="flex flex-col space-y-4">
                {popularBlogs.map((Singleblog, key) => (
                  <div
                    key={key}
                    className="bg-gray-50 rounded-lg p-4 shadow-md border"
                  >
                    {console.log(Singleblog.title)}
                    <h2 className="text-lg font-semibold">
                      Title:{Singleblog.title}
                    </h2>
                    <p className="text-gray-600">
                      Content:{Singleblog.content.substr(0, 30)}
                    </p>
                    <div className="flex relative">
                      <img
                        className="h-16 w-16 object-cover rounded-lg "
                        src={Singleblog.img}
                        alt="img"
                      />
                      <button className=" bg-gray-400 rounded-lg h-8 px-1 absolute right-8 top-5 text-white">
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
