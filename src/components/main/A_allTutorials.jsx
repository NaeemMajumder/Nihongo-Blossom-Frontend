import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom"; // For navigation
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa"; // For edit and delete icons
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const A_allTutorials = () => {
  let navigate = useNavigate();
  let allTutorials = useLoaderData();

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  // State to manage delete confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutorialToDelete, setTutorialToDelete] = useState(null);

  // Handle edit tutorial
  const handleEdit = (id) => {
    // Add your edit logic here (e.g., navigate to edit page)
  };

  // Handle delete tutorial
  const handleDelete = (id) => {
    setTutorialToDelete(id); // Set the tutorial id to be deleted
    setIsModalOpen(true); // Open the modal
  };

  // Confirm delete
  const confirmDelete = async () => {
    setIsModalOpen(false); // Close the modal immediately

    try {
      const response = await fetch(
        `https://programminghero-job-ta-backend.vercel.app/admin/allTutorials/${tutorialToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/admin/allTutorials"); // Redirect after successful deletion
        toast.success("Tutorial Deleted");
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to delete tutorial: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      toast.error(
        "An error occurred while deleting the tutorial. Please try again."
      );
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  // Calculate the index of the first and last tutorial on the current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  // Slice the tutorials array to get the tutorials for the current page
  const currentVideos = allTutorials.slice(indexOfFirstVideo, indexOfLastVideo);

  // Calculate total pages
  const totalPages = Math.ceil(allTutorials.length / videosPerPage);

  // Handle pagination click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Helmet>
        <title>All Tutorials</title>
        <meta
          name="description"
          content="This is a custom description for my page."
        />
        <meta name="keywords" content="React, Helmet, SEO, Meta Tags" />
      </Helmet>
      <div className="bg-[#EDF8FA] min-h-screen p-6 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#3EB68D] mb-6">
          Japanese Language Learning Tutorials
        </h1>

        <div className="flex justify-between items-center mb-6 w-full max-w-6xl">
          {/* Total Tutorials Button */}
          <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-medium text-[#164193]">
              Total Tutorials:{" "}
              <span className="text-[#3EB68D] font-semibold">
                {allTutorials.length}
              </span>
            </h2>
          </div>

          {/* Add Tutorial Button */}
          <div className="flex items-center">
            <Link to="/admin/addTutorial">
              <button className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                Add Tutorials +
              </button>
            </Link>
          </div>
        </div>

        {/* Tutorial Videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl mb-20">
          {currentVideos.map((video, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
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

              {/* Video Title and Actions */}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-[#164193]">
                    {video.videoTitle}
                  </h3>
                </div>
                <div className="flex gap-3">
                  {/* Edit Button */}
                  <Link to={`/admin/allTutorials/edit/${video._id}`}>
                    <button
                      title="edit tutorial"
                      onClick={() => handleEdit(index)}
                      className="text-[#3EB68D] hover:text-[#164193] transition-colors"
                    >
                      <FaEdit size={20} />
                    </button>
                  </Link>

                  {/* Delete Button */}
                  <button
                    title="Delete tutorial"
                    onClick={() => handleDelete(video._id)}
                    className="text-red-500 hover:text-[#164193] transition-colors"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#3EB68D] text-white px-4 py-2 rounded-lg font-semibold disabled:bg-gray-300 transition-transform duration-300 hover:scale-105"
          >
            <FaArrowLeft />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === index + 1
                  ? "bg-[#2262A6] text-white"
                  : "bg-white text-[#164193] hover:bg-[#3EB68D] hover:text-white"
              } transition-colors duration-300`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-[#3EB68D] text-white px-4 py-2 rounded-lg font-semibold disabled:bg-gray-300 transition-transform duration-300 hover:scale-105"
          >
            <FaArrowLeft className="transform rotate-180" />
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-xl text-[#164193] font-semibold mb-4">
                Are you sure you want to delete this tutorial?
              </h2>
              <div className="flex justify-between gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default A_allTutorials;
