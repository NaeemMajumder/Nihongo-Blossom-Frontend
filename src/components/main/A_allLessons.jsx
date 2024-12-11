import React, { useState } from "react";
import { Link } from "react-router-dom";

const A_allLessons = () => {
  // Sample lesson data (replace with dynamic data later)
  const lessons = [
    { id: 1, name: "Basic Greetings", number: 1, vocabCount: 12 },
    { id: 2, name: "Common Phrases", number: 2, vocabCount: 8 },
    { id: 3, name: "Numbers and Counting", number: 3, vocabCount: 15 },
    { id: 4, name: "Everyday Vocabulary", number: 4, vocabCount: 10 },
    { id: 5, name: "Time and Dates", number: 5, vocabCount: 6 },
    { id: 6, name: "Advanced Japanese Grammar", number: 6, vocabCount: 20 },
    { id: 7, name: "Japanese Culture", number: 7, vocabCount: 9 },
    { id: 8, name: "Hiragana Mastery", number: 8, vocabCount: 18 },
    { id: 9, name: "Katakana Introduction", number: 9, vocabCount: 14 },
    { id: 10, name: "Kanji Basics", number: 10, vocabCount: 25 },
    { id: 11, name: "Japanese Pronunciation", number: 11, vocabCount: 11 },
    { id: 12, name: "Business Japanese", number: 12, vocabCount: 30 },
    { id: 13, name: "JLPT N5", number: 13, vocabCount: 50 },
  ];

  // State for current page and search query
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Items per page (pagination)
  const itemsPerPage = 9;

  // Filter lessons based on search query
  const filteredLessons = lessons.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen">
      <div className="max-w-[1350px] m-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#164193] mb-4 sm:mb-0">
            Manage Lessons
          </h1>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
            <Link to={'/admin/addLessons'}>
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
              <h3 className="text-xl font-semibold text-[#3EB68D] mb-2">
                {lesson.name}
              </h3>
              <p className="text-[#2262A6] mb-1">
                <strong>Lesson Number:</strong> {lesson.number}
              </p>
              <p className="text-[#2262A6]">
                <strong>Vocabulary Count:</strong> {lesson.vocabCount}
              </p>
              <div className="flex justify-between mt-4 gap-2">
                <Link to={`/admin/lessonDetails/${lesson.id}`}>
                  <button className="bg-gradient-to-br from-[#3EB68D] to-[#164193] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity">
                    Details
                  </button>
                </Link>
                <button className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12 gap-4">
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

export default A_allLessons;
