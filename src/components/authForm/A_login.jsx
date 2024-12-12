import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const A_login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showBanner, setShowBanner] = useState(true); // State to handle the banner visibility

  let { setAdmin, signInUser } = useContext(AuthContext);
  let navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zAAT0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password is required");
    }

    if (validateEmail(email) && validatePassword(password)) {
      let form = e.target;
      let email = form.email.value;
      let password = form.password.value;

      signInUser(email, password)
        .then((currentUser) => {
          setAdmin(currentUser.user);
          navigate(location?.state ? location.state : "/admin");
          toast.success("Admin login successful");
        })
        .catch((error) => {
          toast.error(error);
        });


    }
  };

  // Close the banner when the admin clicks the "Close" button
  const closeBanner = () => {
    setShowBanner(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#faf6ed]">

      {/* Banner / Info Div */}
      {showBanner && (
        <div className="w-full bg-yellow-500 text-black text-center p-4 fixed top-0 left-0 z-50 flex justify-between items-center px-4 md:px-8">
          <span>email: admin@gmail.com<br />password: adminadmin</span>
          <button
            onClick={closeBanner}
            className="text-white text-xl cursor-pointer hover:text-gray-200"
          >
            &times;
          </button>
        </div>
      )}

      {/* Login Form */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md mt-20 md:mt-32">
        <h2 className="text-3xl font-semibold text-center text-yellow-500 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-yellow-500"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-yellow-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="mt-4">
            <Link
              to="/forgot-password"
              className="text-yellow-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-md mt-4 hover:bg-yellow-600 transition"
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default A_login;
