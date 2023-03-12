import React, { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Dashboard from "./Dashboard";

const EmailGen = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState("");
  function createHandler() {
    const from = document.querySelector("#from");
    const by = document.querySelector("#to");
    const desc = document.querySelector("#description");
    if (from.value !== "" && by.value !== "" && desc.value !== "") {
      setGenerating(true);
      fetch("http://localhost:5000/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: from.value,
          by: by.value,
          description: desc.value
        })
      })
        .then((res) => res.json())
        .then((data) => {
          setGenerating(false);
          setGenerated(data.email);
        });
    } else {
      toast.info("Please fill all the fields");
      return;
    }
  }
  useEffect(() => {
    if (generated !== "") {
      (async function () {
        const newHandle = await window.showSaveFilePicker();
        const writableStream = await newHandle.createWritable();
        await writableStream.write(generated);
        await writableStream.close();
      })();
    }
  }, [generated]);
  return (
    <div className="w-[400px] h-screen bg-[#0a1929]">
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
                Generate a Email
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                Not sure what to?
                <Link
                  component={Dashboard}
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 focus:border-indigo-800"
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
                      htmlFor="size"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      From
                    </label>
                    <div>
                      <input
                        type="text"
                        id="from"
                        name="from"
                        placeholder="Ritvik Shukla"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="to"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      To
                    </label>
                    <div>
                      <input
                        type="To"
                        id="to"
                        name="to"
                        placeholder="Tanishq Rajput"
                        className="w-full px-3 py-2  placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="size"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      Description
                    </label>
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="About job request at your organization........"
                        className="w-full px-3 py-2  resize-none placeholder-gray-400 border focus:border-indigo-300 rounded-md focus:ring-1 focus:outline-none  bg-gray-700 text-white border-gray-600"
                        required
                        rows={5}
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
                    <>Generate Email</>
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

export default EmailGen;
