import React, { useState } from "react";
import { Link } from "react-chrome-extension-router";
import { ToastContainer, toast } from "react-toastify";
import Support from "../components/Support";
import Dashboard from "./Dashboard";

const GitHubOrgManager = () => {
  const [creating, setCreating] = useState(false);
  const [alarms, setAlarms] = useState();
  function createHandler() {
    const username = document.querySelector("#username");
    const repo = document.querySelector("#repo");
    if (username.value !== "" && repo.value !== "") {
      chrome.runtime.sendMessage(
        JSON.stringify({
          username: username.value,
          repo: repo.value
        }),
        (response) => {
          const result = JSON.parse(response);
          if (result.status === "success") {
            toast.success("Successfully set the alarm!");
          }
        }
      );
    } else {
      toast.info("Please give username!");
      return;
    }
  }
  function deleteHandler() {}
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
                Create Alarm
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Not sure what to?
                <Link
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 focus:border-indigo-800"
                  component={Dashboard}
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
                      htmlFor="username"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Username
                    </label>
                    <div>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="shuklaritvik06"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="repo"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Repo Name
                      </label>
                      <div>
                        <input
                          type="text"
                          id="repo"
                          name="repo"
                          placeholder="webxdao.github.io"
                          className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                          required
                        />
                      </div>
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
                    <>Create Alarm</>
                  )}
                </button>
              </form>
              <Support />
              <button
                type="button"
                className="w-full mt-5 py-3 px-4 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => deleteHandler()}
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
                  <>Delete Alarm</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubOrgManager;
