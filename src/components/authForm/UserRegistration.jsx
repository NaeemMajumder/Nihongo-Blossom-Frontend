import React, { useState } from "react";

const UserRegistration = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    // Password validation when password or confirm password changes
    if (name === "password" || name === "confirmPassword") {
      validatePassword(value);
    }

    // Field validation
    if (name === "name" || name === "email") {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "name" && value.trim() === "") {
      error = "Name is required.";
    }
    if (
      name === "email" &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
    ) {
      error = "Enter a valid email address.";
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = e.target;

    let name = form.name.value;
    let email = form.email.value;
    let photoUrl = form.photoUrl.value;
    let password = form.password.value;


    // submit handle
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#EDF8FA] relative">
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold text-[#164193]">
              Register
            </h2>

            {/* Name Input */}
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#2262A6]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-2 border border-[#2262A6] rounded-md mt-2"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#2262A6]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border border-[#2262A6] rounded-md mt-2"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Photo URL Input */}
            <div className="mt-4">
              <label
                htmlFor="photoUrl"
                className="block text-sm font-semibold text-[#2262A6]"
              >
                Profile Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                name="photoUrl"
                value={userData.photoUrl}
                onChange={handleChange}
                placeholder="Enter the URL of your profile photo"
                className="w-full p-2 border border-[#2262A6] rounded-md mt-2"
              />
            </div>

            {/* Password Input */}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#2262A6]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border border-[#2262A6] rounded-md mt-2"
              />
              {/* Password Validation */}
              <div className="mt-2 text-xs text-[#2262A6]">
                <ul className="grid grid-cols-2 gap-2">
                  <li
                    className={`flex items-center ${
                      passwordValidation.length ? "text-green-500" : ""
                    }`}
                  >
                    {passwordValidation.length ? "✔" : "❌"} At least 8
                    characters
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordValidation.uppercase ? "text-green-500" : ""
                    }`}
                  >
                    {passwordValidation.uppercase ? "✔" : "❌"} At least one
                    uppercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordValidation.lowercase ? "text-green-500" : ""
                    }`}
                  >
                    {passwordValidation.lowercase ? "✔" : "❌"} At least one
                    lowercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordValidation.number ? "text-green-500" : ""
                    }`}
                  >
                    {passwordValidation.number ? "✔" : "❌"} At least one number
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordValidation.specialChar ? "text-green-500" : ""
                    }`}
                  >
                    {passwordValidation.specialChar ? "✔" : "❌"} At least one
                    special character
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-[#2262A6]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-2 border border-[#2262A6] rounded-md mt-2"
              />
              {userData.confirmPassword !== userData.password &&
                userData.confirmPassword !== "" && (
                  <p className="text-red-500 text-xs mt-1">
                    Passwords do not match.
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className={`w-full text-white p-2 rounded-md font-semibold hover:bg-[#2262A6] transition ${
                  !passwordValidation.length ||
                  !passwordValidation.uppercase ||
                  !passwordValidation.lowercase ||
                  !passwordValidation.number ||
                  !passwordValidation.specialChar ||
                  errors.name ||
                  errors.email
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3EB68D]"
                }`}
                disabled={
                  !passwordValidation.length ||
                  !passwordValidation.uppercase ||
                  !passwordValidation.lowercase ||
                  !passwordValidation.number ||
                  !passwordValidation.specialChar ||
                  errors.name ||
                  errors.email
                }
              >
                Register
              </button>
            </div>

            {/* Links */}
            <div className="mt-4 text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-[#2262A6] hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;
