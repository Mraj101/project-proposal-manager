import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateBlogs from "./components/createBlogs";
import Navbar from "./components/Navbar";
import Signup from "./pages/StudentSignup";
import Signuppage from "./pages/SignUppage"
import { useAuthContext } from "./hooks/useAuthContext";
import { AuthContext } from "./context/AuthProvider";
import SingleBlog from "./components/SingleBlog";
import Login from "./pages/login";
import HomeLayout from "./pages/HomeLayout";
import Hero from "./pages/Hero";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import UserProfile from "./components/userProfile";
function App() {
  const { user } = useAuthContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route index element={<HomeLayout />} />

          {/* routes to be protected */}
          <Route element={<RequireAuth/>}>
            <Route path="/create" element={<CreateBlogs />} />
            <Route path="/blogs/:id" element={<SingleBlog />} />
            <Route path="/userProfile" element={<UserProfile/>} />
          </Route>

          {/* call all */}
          {/* <Route path="*" element={<Missing />} /> */}
        </Route>
      </Routes>
    </>

    // <Router>
    //   <AuthContextProvider>
    //     <Navbar />
    //     <Routes>
    //
    //     </Routes>
    //   </AuthContextProvider>
    // </Router>
  );
}

export default App;
