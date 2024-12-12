import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { FaArrowLeft } from "react-icons/fa";

const A_addTutorial = () => {
  let navigate = useNavigate();

  const [videoEmbedCode, setVideoEmbedCode] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extracting the src URL from the iframe embed code
    const regex = /src="([^"]+)"/;
    const match = videoEmbedCode.match(regex);

    if (match && match[1]) {
      // Only store the src URL (video URL)
      console.log("Tutorial Created:", { videoURL: match[1], videoTitle });
      let newTutorial = { videoURL: match[1], videoTitle };
      console.log(newTutorial);

      // Send the data to the backend (API request)
      fetch("http://localhost:8080/admin/allTutorials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTutorial),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/admin/allTutorials"); // Redirect after success
        });
    } else {
      alert("Invalid iframe embed code. Please provide a valid YouTube iframe embed code.");
    }
  };

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/admin/allTutorials"
            className="text-[#164193] font-semibold text-md flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <FaArrowLeft /> Back to All Tutorials
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-[#164193]">Add New Tutorial</h1>
          <p className="mt-2 text-lg text-[#2262A6]">Add details for the new tutorial</p>
        </div>

        {/* Add Tutorial Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Embed Code */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">
              YouTube Iframe Embed Code (full Link)
            </label>
            <input
              type="text"
              value={videoEmbedCode}
              onChange={(e) => setVideoEmbedCode(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter YouTube iframe embed code"
              required
            />
          </div>

          {/* Video Title */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">Video Title</label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Add Tutorial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default A_addTutorial;
