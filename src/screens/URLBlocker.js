import React, { useEffect, useState } from "react";
import { goTo, Link } from "react-chrome-extension-router";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./Dashboard";

const URLBlocker = () => {
  const [creating, setCreating] = useState(false);
  const [url, setURL] = useState([]);
  function createHandler() {
    const url = document.getElementById("url");
    if (url.value !== "") {
      setCreating(true);
      let value = [];
      chrome.storage.sync.get(["url"], function (result) {
        if (result.url) {
          const values = JSON.parse(result.url);
          value = [...values];
        }
        value.push(url.value);
        chrome.storage.sync.set({ url: JSON.stringify(value) }, function () {
          setCreating(false);
          toast.success("URL Added Successfully");
        });
      });
    } else {
      toast.error("Please enter a valid URL");
      return;
    }
  }
  function deleteHelper(e) {
    const id = parseInt(e.target.id);
    chrome.storage.sync.get(["url"], function (result) {
      if (result.url) {
        let values = JSON.parse(result.url);
        values.splice(id, 1);
        setURL(values);
        chrome.storage.sync.set({ url: JSON.stringify(values) }, function () {
          toast.success("Deleted URL");
        });
      }
    });
  }
  useEffect(() => {
    chrome.storage.sync.get(["url"], function (result) {
      if (result.url) {
        const values = JSON.parse(result.url);
        setURL(values);
      }
    });
  }, [creating]);
  return (
    <div className="w-[400px] h-[550px] overflow-hidden  bg-[#0a1929]">
      <ToastContainer />
      <div className="max-w-md mx-auto p-6">
        <div>
          <div>
            <div className="text-center">
              <div className="w-full flex justify-center">
                <img
                  src="images/logo.png"
                  alt="SecureHubX Logo"
                  className="w-32 h-32 mt-2 mb-4"
                />
              </div>
              <h1 className="block text-xl font-bold text-white">Block URL</h1>
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
                      htmlFor="url"
                      className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                    >
                      URL
                    </label>
                    <div>
                      <input
                        type="text"
                        id="url"
                        name="url"
                        placeholder="https://www.instagram.com"
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
                    <>Add URL</>
                  )}
                </button>
              </form>
              <div className="overflow-y-scroll h-[120px] mt-2">
                {url.length > 0 ? (
                  <>
                    {url.map((item, index) => {
                      return (
                        <div
                          key={Math.random() * 1000}
                          className="p-3 mx-3 bg-[#132f4c] border border-[#5090d3] text-base text-white rounded-md my-3"
                        >
                          <div className="w-full flex justify-center">
                            <img
                              src={`https://www.google.com/s2/favicons?sz=64&domain_url=${
                                new URL(item).hostname
                              }`}
                              alt=""
                              className="w-10 h-10 rounded-md"
                            />
                          </div>
                          <div className="text-gray-600">
                            <div className="flex justify-between">
                              <div>
                                <span className="text-white font-bold">
                                  URL:{" "}
                                </span>
                                <span id="">{item}</span>
                              </div>
                              <button
                                className="ml-5 bg-blue-500 text-white p-1 rounded-md"
                                id={index}
                                onClick={(e) => deleteHelper(e)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-white mt-3 w-full flex justify-center">
                    No URL Added
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLBlocker;
