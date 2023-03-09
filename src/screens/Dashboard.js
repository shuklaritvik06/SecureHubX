import React, { useEffect } from "react";
import { goTo, Link } from "react-chrome-extension-router";
import Login from "./Login";
import PasswordManager from "./PasswordManager";
import GitHubOrgManager from "./GitHubOrgManager";

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
              <div className="w-full flex justify-center">
                <img
                  src="images/logo.png"
                  alt="SecureHubX Logo"
                  className="w-24 h-24 my-5"
                />
              </div>
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
          <div className="mt-16 flex flex-col w-full items-center">
            <p className="text-white text-lg font-bold mb-5">
              Loved my work?
              <span className="text-md text-blue-400 font-medium">
                {" "}
                Support Me
              </span>
            </p>
            <a
              href="https://www.buymeacoffee.com/ritvikshukla"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{ height: "60px", width: "217px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
