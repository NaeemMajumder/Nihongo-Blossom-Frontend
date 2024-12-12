import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom"; // For navigation
import { FaArrowLeft } from "react-icons/fa";

const UserAllTutorials = () => {
  const allTutorials = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const tutorialsPerPage = 6;

  // Calculate the number of pages based on the number of tutorials
  const totalPages = Math.ceil(allTutorials.length / tutorialsPerPage);

  // Slice the tutorials array to show only the current page's tutorials
  const currentTutorials = allTutorials.slice(
    (currentPage - 1) * tutorialsPerPage,
    currentPage * tutorialsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-[#EDF8FA] min-h-screen p-6 flex flex-col items-center">
      {/* Back Button */}
      <Link
        to="/lessons"
        className="text-[#164193] font-semibold text-lg flex items-center gap-2 hover:opacity-90 transition-opacity mb-6"
      >
        <FaArrowLeft /> Back to Lessons
      </Link>

      {/* Title and Total Tutorial Count */}
      <h1 className="text-3xl font-bold text-[#3EB68D] mb-6">Japanese Language Learning Tutorials</h1>

      <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-medium text-[#164193]">
          Total Tutorials:{" "}
          <span className="text-[#3EB68D] font-semibold">
            {allTutorials.length}
          </span>
        </h2>
      </div>

      {/* Tutorial Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl mb-20">
        {currentTutorials.map((video, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Video */}
            <iframe
              width="100%"
              height="315"
              src={video.videoURL}
              title={`Japanese Tutorial ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Video Title */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#164193]">{video.videoTitle}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        {/* Previous Button */}
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-[#2262A6] text-white px-4 py-2 rounded-lg hover:bg-[#164193] transition-colors"
          >
            Previous
          </button>
        )}

        {/* Page Number Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === index + 1
                ? "bg-[#3EB68D] text-white"
                : "bg-white text-[#2262A6] hover:bg-[#164193] hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-[#2262A6] text-white px-4 py-2 rounded-lg hover:bg-[#164193] transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default UserAllTutorials;
