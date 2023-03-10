import React from "react";

const Support = () => {
  return (
    <div className="mt-10 flex flex-col w-full items-center">
      <p className="text-white text-lg font-bold mb-5">
        Loved my work?
        <span className="text-md text-blue-400 font-medium"> Support Me</span>
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
  );
};

export default Support;
