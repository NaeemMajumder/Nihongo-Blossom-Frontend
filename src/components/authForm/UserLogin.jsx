import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For navigation links
import "../../styles/adminLoginBtn.css";

const UserLogin = () => {
  // States for form input and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isJumping, setIsJumping] = useState(false);

  // Validate the form input
  const validateForm = () => {
    let emailError = "";
    let passwordError = "";

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError = "Email is required";
    } else if (!emailRegex.test(email)) {
      emailError = "Please enter a valid email";
    }

    // Password Validation
    if (!password) {
      passwordError = "Password is required";
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    // Set errors
    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Logic for submitting the form
      console.log("Form submitted");
    }
  };

  // Admin Button Animation (auto jump every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500); // stop the jump animation after 500ms
    }, 2000); // jump every 2 seconds

    return () => clearInterval(interval); // Clean up the interval when the component is unmounted
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EDF8FA] relative">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-[#164193] mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[#164193] text-lg font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-[#C9E5E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2262A6] focus:border-[#2262A6]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-[#164193] text-lg font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-[#C9E5E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2262A6] focus:border-[#2262A6]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/forgot-password"
              className="text-[#2262A6] text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2262A6] text-white py-3 mt-4 rounded-lg hover:bg-[#1CA288] transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-[#2262A6]">
            Don't have an account?
            <Link to="/register" className="font-semibold hover:text-[#3EB68D]">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>

      <div>
        <Link to="/admin/login">
          <button className="admin-button">Are you admin?</button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
