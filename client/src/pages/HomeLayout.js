import React, { useEffect, useState } from 'react'
import Home from "./StudentPanel";
import StudentPanel from "./StudentPanel";
import SuperVisorPanel from "../components/SuperVisorPanel";
import HodPanel from "../components/HodPanel";
import { useAuthContext } from "../hooks/useAuthContext";

const HomeLayout = () => {
  const { usr, setUsr } = useAuthContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
        setUsr(storedUser)
    }
    setLoading(false)
}, [setUsr])

  const renderPanel = () => {
    if (usr?.position === "1") {
      return <StudentPanel />;
    } else if (usr?.position === "2") {
      return <SuperVisorPanel />;
    }else {
      return <HodPanel />;
    }
  };

  return (
    <div>
      {renderPanel()}
    </div>
  );
};

export default HomeLayout;
