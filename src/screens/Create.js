import React, { useState } from "react";
import { Link } from "react-chrome-extension-router";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import PasswordManager from "./PasswordManager";

const Create = () => {
  const [creating, setCreating] = useState(false);
  function createHandler() {
    console.log("Hello");
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const domain = document.querySelector("#domain").value;
    const master = document.querySelector("#master").value;
    if (email !== "" && password !== "" && domain !== "") {
      setCreating(true);
    } else {
      toast.info("Please fill all fields!");
    }
  }
  return (
    <div className="w-screen h-screen bg-[#0a1929]">
      <ToastContainer />
      <div className="max-w-md mx-auto p-6">
        <div>
          <div>
            <div className="text-center">
              <div className="w-full flex justify-center">
                <img
                  src="images/logo.png"
                  alt="SecureHubX Logo"
                  className="w-50 h-10 mt-2 mb-4"
                />
              </div>
              <h1 className="block text-xl font-bold text-white">
                Save a Password
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Not sure what to?
                <Link
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 focus:border-indigo-800"
                  component={PasswordManager}
                >
                  {" "}
                  Go Back
                </Link>
              </p>
            </div>
            <div className="mt-5">
              <form className="text-white">
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Email address
                    </label>
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@company.com"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Password
                    </label>
                    <div>
                      <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="***************"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="master"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Master Key
                    </label>
                    <div>
                      <input
                        type="text"
                        id="master"
                        name="master"
                        placeholder="***************"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="domain"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Company Domain
                    </label>
                    <div>
                      <input
                        type="text"
                        id="domain"
                        name="domain"
                        placeholder="www.domain.com"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full py-3 px-4 mt-5 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => createHandler()}
                >
                  {creating ? (
                    <RingLoader
                      color={"white"}
                      loading={creating}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <>Add Domain</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
