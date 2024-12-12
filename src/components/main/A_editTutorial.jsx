import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const A_editTutorial = () => {
  let tutorialData = useLoaderData();
  const navigate = useNavigate();


  const [tutorial, setTutorial] = useState({
    videoURL: tutorialData.videoURL,
    videoTitle: tutorialData.videoTitle,
  });

// Handle input changes
const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // If the name is 'videoURL' and it contains an iframe, extract the src URL
    if (name === "videoURL") {
      // Extract the src URL from iframe embed code
      const iframeSrcMatch = value.match(/src="([^"]+)"/);
      if (iframeSrcMatch) {
        // If a match is found, update the state with the src URL
        setTutorial({
          ...tutorial,
          videoURL: iframeSrcMatch[1],
        });
      } else {
        // If no match, store the value as it is
        setTutorial({
          ...tutorial,
          videoURL: value,
        });
      }
    } else {
      // For other fields, update the state normally
      setTutorial({
        ...tutorial,
        [name]: value,
      });
    }
  };
  

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();


    fetch(`http://localhost:8080/admin/allTutorials/${tutorialData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorial),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/admin/allTutorials");
          toast.success("Tutorial updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating lesson:", error);
          toast.error("Failed to update the lesson. Please try again.");
        });
  };

  return (
    <div className="bg-[#EDF8FA] min-h-screen p-6 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#3EB68D] mb-6">
        Edit Japanese Tutorial
      </h1>

      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/allTutorials")}
        className="bg-[#164193] text-white px-4 py-2 rounded-md mb-6 flex items-center gap-2 hover:scale-105 transition-transform duration-300"
      >
        <FaArrowLeft /> Back to Tutorials
      </button>

      {/* Form Section */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          {/* Video Title Input */}
          <div className="mb-4">
            <label
              htmlFor="videoTitle"
              className="block text-[#164193] font-semibold mb-2"
            >
              Video Title
            </label>
            <input
              type="text"
              name="videoTitle"
              value={tutorial.videoTitle}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D]"
            />
          </div>

          {/* Video URL Input */}
          <div className="mb-4">
            <label
              htmlFor="videoURL"
              className="block text-[#164193] font-semibold mb-2"
            >
              YouTube Iframe Embed Code (full Link)
            </label>
            <input
              type="text"
              name="videoURL"
              value={tutorial.videoURL}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D]"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/allTutorials")}
              className="bg-[#FF5733] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default A_editTutorial;
