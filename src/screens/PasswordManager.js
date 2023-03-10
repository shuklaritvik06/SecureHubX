import React from "react";
import { Link } from "react-chrome-extension-router";
import Logo from "../components/Logo";
import Create from "./Create";
import Generate from "./Generate";
import Search from "./Search";

const PasswordManager = () => {
  return (
    <div className="w-[400px] h-[550px] bg-[#0a1929]">
      {" "}
      <div className="flex items-center">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto mt-10 mb-8">
            <div>
              <Logo />
            </div>
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
          <div className="mt-10 flex flex-col w-full items-center">
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

export default PasswordManager;
