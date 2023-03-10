import React from "react";
import { Link } from "react-chrome-extension-router";
import { ToastContainer } from "react-toastify";
import Logo from "../components/Logo";
import Support from "../components/Support";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Generate from "./Generate";
import Search from "./Search";

const PasswordManager = () => {
  return (
    <div className="w-[400px] h-[550px] bg-[#0a1929]">
      <ToastContainer />
      <div className="flex items-center">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto mt-3 mb-8">
            <div>
              <Logo />
            </div>
            <p className="mt-2 text-sm text-gray-400 text-center">
              Not sure what to?
              <Link
                className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 focus:border-indigo-800"
                component={Dashboard}
              >
                {" "}
                Dashboard
              </Link>
            </p>
          </div>

          <div>
            <Link
              component={Generate}
              className="p-3  m-3 bg-[#132f4c] border border-[#5090d3] text-2xl text-white font-extrabold rounded-md flex justify-center items-center"
            >
              Generate
            </Link>
            <Link
              component={Create}
              className="p-3  m-3 bg-[#132f4c] border border-[#5090d3] text-2xl text-white font-extrabold rounded-md flex justify-center items-center"
            >
              Save
            </Link>
            <Link
              component={Search}
              className="p-3  m-3 bg-[#132f4c] border border-[#5090d3] text-2xl text-white font-extrabold rounded-md flex justify-center items-center"
            >
              Search
            </Link>
          </div>
          <Support />
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
