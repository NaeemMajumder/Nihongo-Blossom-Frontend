import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // For navigation links
import { FcGoogle } from "react-icons/fc";
import "../../styles/adminLoginBtn.css";
import { AuthContext } from "../provider/AuthProvider";

const UserLogin = () => {

  let { setUser, signInUser, registerWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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

    // Check if the entered email is "admin@gmail.com"
    if (email === "admin@gmail.com") {
      alert("This is only for user login. Please go to the admin login form.");
      return; // Prevent form submission
    }

    if (validateForm()) {
      let form = e.target;

      let email = form.email.value;
      let password = form.password.value;

      console.log(email, password);

      signInUser(email, password)
        .then((currentUser) => {
          console.log(currentUser.user);
          navigate(location?.state ? location.state : "/lessons");
        })
        .catch((error) => {
          alert(error);
        });

      console.log("Form submitted");
    }
  };

  const handleGoogleRegistration = ()=>{
    registerWithGoogle()
    .then((result)=>{
      console.log(result.user);
      // navigate(location?.state ? location.state : "/");
    }).catch(error=>alert(error.message));
  }

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

        <form onSubmit={handleSubmit} className="mt-4">
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
              name="email"
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
              name="password"
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

          {/* Google Sign-In Button */}
          <div className="mt-6">
            <button onClick={handleGoogleRegistration}
              className="w-full flex items-center justify-center bg-white border-2 border-[#C9E5E9] text-[#164193] py-3 rounded-lg hover:bg-[#EDF8FA] transition duration-300"
              // Add Google Sign-In logic here
            >
              <FcGoogle className="text-2xl mr-3" />
              Sign in with Google
            </button>
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
