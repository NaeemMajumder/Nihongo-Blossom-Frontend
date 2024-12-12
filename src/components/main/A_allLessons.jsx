import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const A_allLessons = () => {

  let navigate = useNavigate();

  let lessons = useLoaderData() || {}; // Default to an empty object if undefined
  let vocabularies = lessons.vocabularies || []; // Default to an empty array if undefined

  // State for current page, search query, and modal visibility
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const itemsPerPage = 9;

  // Filter lessons based on search query
  const filteredLessons = lessons.filter((lesson) =>
    lesson.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the current lessons to display based on pagination
  const indexOfLastLesson = currentPage * itemsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - itemsPerPage;
  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Pagination controls
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle the delete action
  const handleDelete = (lessonId) => {
    setLessonToDelete(lessonId);
    setIsModalOpen(true);
  };

  // Confirm delete and show 
  const confirmDelete = async() => {
    setIsModalOpen(false);

    try {
      const response = await fetch(`http://localhost:8080/admin/allLessons/${lessonToDelete}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        navigate("/admin/allLessons");
        toast.success("Lesson is deleted");
      } else {
        toast.error("Failed to delete lesson");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setIsModalOpen(false);
    setLessonToDelete(null);
  };

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen">
      <div className="max-w-[1350px] m-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#164193] mb-4 sm:mb-0">
            Manage Lessons
          </h1>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
            <Link to={"/admin/addLessons"}>
              <button className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                Add Lesson +
              </button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search lessons..."
            className="w-full sm:w-1/2 p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
          />
        </div>

        {/* Total Lessons Count */}
        <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-medium text-[#164193]">
            Total Lessons:{" "}
            <span className="text-[#3EB68D] font-semibold">
              {filteredLessons.length}
            </span>
          </h2>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold text-[#3EB68D] mb-2">
                {lesson?.lessonTitle}
              </h3>
              <p className="text-[#2262A6] mb-1">
                <strong>Lesson Number:</strong> {lesson?.lessonNumber}
              </p>
              <p className="text-[#2262A6]">
                <strong>Vocabulary Count:</strong> {lesson.vocabularies?.length}
              </p>
              <div className="flex justify-between mt-4 gap-2">
                <Link to={`/admin/allLessons/${lesson._id}`}>
                  <button className="bg-gradient-to-br from-[#3EB68D] to-[#164193] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity">
                    Details
                  </button>
                </Link>
                <Link to={`/admin/allLessons/edit/${lesson._id}`}>
                  <button className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`bg-[#164193] text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#3EB68D]"
            }`}
          >
            Previous
          </button>

          <span className="text-[#164193] text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`bg-[#164193] text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#3EB68D]"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold text-[#164193] mb-4">
              Are you sure you want to delete this lesson?
            </h2>
            <div className="flex justify-between gap-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default A_allLessons;
