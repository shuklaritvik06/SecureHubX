import React, { useEffect } from "react";
import { goTo, Link } from "react-chrome-extension-router";
import Login from "./Login";
import PasswordManager from "./PasswordManager";
import GitHubOrgManager from "./GitHubOrgManager";
import Logo from "../components/Logo";
import Support from "../components/Support";

const Dashboard = () => {
  useEffect(() => {
    let authToken = localStorage.getItem("Auth Token");
    if (!authToken) {
      goTo(Login);
    }
  }, []);
  return (
    <div className="w-[400px] h-[550px] bg-[#0a1929]">
      <div className="flex items-center">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto mt-10 mb-8">
            <div className="text-center">
              <Logo />
            </div>
          </div>
          <div>
            <Link
              component={PasswordManager}
              className="p-3 m-3 bg-[#132f4c] border border-[#5090d3] text-2xl text-white font-extrabold rounded-md flex justify-center items-center"
            >
              Password Manager
            </Link>
            <Link
              component={GitHubOrgManager}
              className="p-3  m-3 bg-[#132f4c] border border-[#5090d3] text-2xl text-white font-extrabold rounded-md flex justify-center items-center"
            >
              GitHub Manager
            </Link>
          </div>
          <Support />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
