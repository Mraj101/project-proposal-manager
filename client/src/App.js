import Home from "./pages/StudentPanel";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateProposal from "./components/CreateProposal";
import StudentPanel from "./pages/StudentPanel";
import Navbar from "./components/Navbar";
import Signup from "./pages/StudentSignup";
import Signuppage from "./pages/SignUppage";
import { useAuthContext } from "./hooks/useAuthContext";
import { AuthContext } from "./context/AuthProvider";
import SingleBlog from "./components/SingleBlog";
import Login from "./pages/login";
import HomeLayout from "./pages/HomeLayout";
import Hero from "./pages/Hero";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import UserProfile from "./components/userProfile";
import SuperVisorPanel from "./components/SuperVisorPanel";
import CreaetPrposaldemo from "./components/CreaetPrposaldemo";


function App() {
  const { user } = useAuthContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          {" "}
          {/*path should not be in layout*/}
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signuppage />} />
          {/* routes to be protected */}
          <Route element={<RequireAuth />}>
            <Route index element={<HomeLayout />} />
            <Route path="/create" element={<CreateProposal />} />
            <Route path="/StudentPanel" element={<StudentPanel />} />
            <Route path="/createDemo" element={<CreaetPrposaldemo />} />
            {/* <Route path="/blogs/:id" element={<SingleBlog />} /> */}
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/supervisor" element={<SuperVisorPanel/>} />
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