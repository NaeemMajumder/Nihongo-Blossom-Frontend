import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const UserAllLessons = () => {

  // Fetch lessons data from the loader
  let allLessons = useLoaderData();
  console.log(allLessons);

  // State for current page, search query, and filter status
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'completed', 'incomplete'


  // Items per page (pagination)
  const itemsPerPage = 9;

  // Filter lessons based on search query and filter status
  const filteredLessons = allLessons
    .filter((lesson) =>
      lesson.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((lesson) => {
      if (filterStatus === "completed") return lesson.completedStatus;
      if (filterStatus === "incomplete") return !lesson.completedStatus;
      return true; // 'all' status, show all lessons
    });

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

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen">
      <div className="max-w-[1350px] m-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[#164193]">Explore All Lessons</h1>
          <p className="text-[#2262A6] mt-2 text-lg">
            Start learning Japanese vocabulary with curated lessons.
          </p>
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

        {/* Filter Section */}
        <div className="flex justify-center mb-6 gap-6">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-6 py-2 rounded-md text-white ${filterStatus === "all" ? "bg-[#3EB68D]" : "bg-[#164193]"} transition-all duration-300`}
          >
            All Lessons
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-6 py-2 rounded-md text-white ${filterStatus === "completed" ? "bg-[#3EB68D]" : "bg-[#164193]"} transition-all duration-300`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilterStatus("incomplete")}
            className={`px-6 py-2 rounded-md text-white ${filterStatus === "incomplete" ? "bg-[#3EB68D]" : "bg-[#164193]"} transition-all duration-300`}
          >
            Incomplete
          </button>
        </div>

        {/* Total Published Lessons */}
        <div className="bg-white shadow-md inline-block rounded-lg p-4 mb-6">
          <h2 className="text-xl font-medium text-[#164193]">
            Total Published Lessons:{" "}
            <span className="text-[#3EB68D] font-semibold">{filteredLessons.length}</span>
          </h2>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {currentLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-transform duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#3EB68D]">{lesson.lessonTitle}</h3>
                
                {/* Badge for Completed/Incompleted */}
                <div
                  className={`text-white px-3 py-1 rounded-full text-sm ${
                    lesson.completedStatus ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {lesson.completedStatus ? "Complete" : "Incomplete"}
                </div>
              </div>

              <p className="text-[#2262A6] mb-1">
                <strong>Lesson Number:</strong> {lesson.lessonNumber}
              </p>
              <p className="text-[#2262A6] mb-1">
                <strong>Vocabulary Count:</strong> {lesson.vocabularies.length}
              </p>

              <Link to={`/lessons/${lesson._id}`}>
                <button className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity w-full mt-4">
                  Go to Lesson
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-4 mb-32">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`bg-[#164193] text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3EB68D]"}`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          <span className="text-[#164193] text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`bg-[#164193] text-white px-6 py-2 rounded-md shadow-md transition-all duration-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3EB68D]"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAllLessons;
