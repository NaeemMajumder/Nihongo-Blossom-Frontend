import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserAllLessons = () => {
  // Sample lessons data with 'completed' status (replace with dynamic data later)
  const lessons = [
    { id: 1, name: "Basic Greetings", number: 1, vocabCount: 12, completed: true },
    { id: 2, name: "Common Phrases", number: 2, vocabCount: 8, completed: false },
    { id: 3, name: "Numbers and Counting", number: 3, vocabCount: 15, completed: true },
    { id: 4, name: "Everyday Vocabulary", number: 4, vocabCount: 10, completed: false },
    { id: 5, name: "Time and Dates", number: 5, vocabCount: 6, completed: true },
    { id: 6, name: "Advanced Japanese Grammar", number: 6, vocabCount: 20, completed: false },
    { id: 7, name: "Japanese Culture", number: 7, vocabCount: 9, completed: true },
    { id: 8, name: "Hiragana Mastery", number: 8, vocabCount: 18, completed: false },
    { id: 9, name: "Katakana Introduction", number: 9, vocabCount: 14, completed: true },
    { id: 10, name: "Kanji Basics", number: 10, vocabCount: 25, completed: true },
    { id: 11, name: "Japanese Pronunciation", number: 11, vocabCount: 11, completed: false },
    { id: 12, name: "Business Japanese", number: 12, vocabCount: 30, completed: true },
    { id: 13, name: "JLPT N5", number: 13, vocabCount: 50, completed: false },
  ];

  // State for current page, search query, and filter status
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'completed', 'incomplete'

  // Items per page (pagination)
  const itemsPerPage = 9;

  // Filter lessons based on search query and filter status
  const filteredLessons = lessons
    .filter((lesson) =>
      lesson.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((lesson) => {
      if (filterStatus === "completed") return lesson.completed;
      if (filterStatus === "incomplete") return !lesson.completed;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-transform duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#3EB68D]">{lesson.name}</h3>
                
                {/* Badge for Completed/Incompleted */}
                <div
                  className={`text-white px-3 py-1 rounded-full text-sm ${
                    lesson.completed ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {lesson.completed ? "Complete" : "Incomplete"}
                </div>
              </div>

              <p className="text-[#2262A6] mb-1">
                <strong>Lesson Number:</strong> {lesson.number}
              </p>
              <p className="text-[#2262A6] mb-1">
                <strong>Vocabulary Count:</strong> {lesson.vocabCount}
              </p>

              <Link to={`/lesson/${lesson.number}`}>
                <button className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity w-full mt-4">
                  Go to Lesson
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-4">
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
