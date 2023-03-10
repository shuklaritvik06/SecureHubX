import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dashboard from "./Dashboard";
import { RingLoader } from "react-spinners";
import { Link } from "react-chrome-extension-router";
import Support from "../components/Support";

const Generate = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState("");
  function createHandler() {
    const size = document.querySelector("#size").value;
    if (size > 5) {
      setGenerating(true);
    } else {
      toast.info("Please give size above five");
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
                Generate a Password
              </h1>
              <p className="mt-2 text-sm text-gray-400">
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
            <div className="mt-5">
              <form className="text-white">
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Size
                    </label>
                    <div>
                      <input
                        type="number"
                        id="size"
                        name="size"
                        placeholder="0"
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
                  {generating ? (
                    <RingLoader
                      color={"white"}
                      loading={generating}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <>Generate Password</>
                  )}
                </button>
              </form>
              <div class="relative mt-10">
                <input
                  type="text"
                  id="password"
                  class="block p-4 pl-10 w-full text-sm rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 placeholder-gray-400 text-white"
                  placeholder="Generated Password"
                  disabled={true}
                  value={generated}
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-2 bg-blue-600"
                  onClick={() => {}}
                >
                  Copy
                </button>
              </div>
              <Support />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
