import React, { useEffect, useState } from "react";
import { goTo, Link } from "react-chrome-extension-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Logo from "../components/Logo";
import Dashboard from "./Dashboard";
import Register from "./Signup";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [logging, setLogging] = useState(false);
  useEffect(() => {
    let authToken = localStorage.getItem("Auth Token");
    if (authToken) {
      goTo(Dashboard);
    }
  }, []);
  function handleLogin() {
    if (
      document.querySelector("#email").value !== "" &&
      document.querySelector("#password").value !== ""
    ) {
      setLogging(true);
    } else {
      toast.info("Please fill all fields!");
      return;
    }
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setLogging(false);
        if (data.status === "success") {
          toast.success(`Logged in!`);
          localStorage.setItem("Auth Token", data.userCredential.user.uid);
          goTo(Dashboard);
        }
        if (data.status === "error") {
          toast.error(data.error);
        }
      });
  }
  return (
    <div className="w-[400px] h-[550px]  bg-[#0a1929]">
      <ToastContainer />
      <div className="text-center">
        <Logo />
        <p className="text-white text-lg font-bold">
          Sign in to access your account
        </p>
      </div>
      <form className="mx-3 mt-5">
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-400">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@company.com"
            className="w-full px-3 py-3 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-1 focus:border-indigo-300 bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-400">
            Password
          </label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            placeholder="*********"
            className="w-full px-3 py-3 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-1 focus:border-indigo-300 bg-gray-700 text-white border-gray-600"
          />
          <div className="absolute right-2 bottom-3">
            {showPass ? (
              <AiOutlineEyeInvisible
                color={"white"}
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            ) : (
              <AiOutlineEye
                color={"white"}
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </div>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="w-full font-bold px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            onClick={() => handleLogin()}
          >
            {logging ? (
              <RingLoader
                color={"white"}
                loading={logging}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>Sign in</>
            )}{" "}
          </button>
        </div>
        <p className="mt-8 text-sm text-center text-gray-400">
          Don&#x27;t have an account yet?{" "}
          <Link
            component={Register}
            className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
