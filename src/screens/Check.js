import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Register from "./Signup";

const Check = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    let authToken = localStorage.getItem("Auth Token");
    if (authToken) {
      setAuth(true);
    }
  }, []);
  return <>{auth ? <Dashboard /> : <Register />}</>;
};

export default Check;
