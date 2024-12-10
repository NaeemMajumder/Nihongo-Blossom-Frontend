import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-[#EDF8FA] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-9xl font-extrabold text-[#2262A6] drop-shadow-md">
        404
      </h1>
      <h2 className="text-3xl text-[#164193] mt-4 font-bold">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-[#1CA288] mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-block py-3 px-8 text-white font-bold rounded-lg bg-gradient-to-br from-[#164193] to-[#3AB092] hover:scale-105 transform transition-all duration-300"
        >
          Go to Home
        </Link>
      </div>
      <div className="mt-8">
        <img
          src="/images/404.png"
          alt="404 Illustration"
          className="w-2/3 max-w-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default Error;
