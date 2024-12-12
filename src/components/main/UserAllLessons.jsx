import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import "../../styles/adminLoginBtn.css";
import { NavLink } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Importing an icon

const UserAllLessons = () => {
  let allLessons = useLoaderData();
  let { user } = useContext(AuthContext);

  let email = user.email || "bughunter7000@gmail.com"; // Example email

  // State for current page, search query, filter status, and user data
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [showCongratulatoryModal, setShowCongratulatoryModal] = useState(false); // For the modal

  // Fetch user data based on email
  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        try {
          let response = await fetch(
            `http://localhost:8080/allUsers/user?email=${email}`
          );
          if (!response.ok) {
            throw new Error("User not found");
          }
          const data = await response.json();
          setCurrentUserData(data);
          if (data.isAdmin) {
            setShowCongratulatoryModal(true); // Show modal if user is admin
          }
        } catch (error) {
          alert(error);
          setCurrentUserData(null);
        }
      };
      fetchData();
    }
  }, [email]);

  console.log(currentUserData);

  // Items per page (pagination)
  const itemsPerPage = 9;

  // Filter lessons based on search query and filter status
  const filteredLessons = allLessons
    .filter((lesson) =>
      lesson.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((lesson) => {
      if (!currentUserData) return true; // If no user data, show all lessons

      const isLessonCompleted = currentUserData.lessons.some(
        (userLesson) =>
          userLesson.lessonId.toString() === lesson._id.toString() &&
          userLesson.completedStatus
      );

      if (filterStatus === "completed") return isLessonCompleted;
      if (filterStatus === "incomplete") return !isLessonCompleted;
      return true; // Show all lessons if filter is 'all'
    });

  // Get current lessons to display based on pagination
  const indexOfLastLesson = currentPage * itemsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - itemsPerPage;
  const currentLessons = filteredLessons.slice(
    indexOfFirstLesson,
    indexOfLastLesson
  );

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

  const closeCongratulatoryModal = () => {
    setShowCongratulatoryModal(false);
  };

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen">
      <div className="max-w-[1350px] m-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[#164193]">
            Explore All Lessons
          </h1>
          <p className="text-[#2262A6] mt-2 text-lg">
            Start learning Japanese vocabulary with curated lessons.
          </p>
        </div>

        {showCongratulatoryModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#164193]">
                  Congratulations!
                </h2>
                <FaCheckCircle className="text-green-500 text-3xl" />{" "}
                {/* Success Icon */}
              </div>
              <p className="mt-4 text-[#2262A6]">
                You have been selected as an admin! You now have full access to
                control the website's features.
              </p>

              {/* Admin Links - Premium Links with Yellow Color */}
              <ul className="mt-6 text-[#164193]">
                <li className="mb-2">
                  <NavLink
                    to={"/admin/allLessons"}
                    className="text-[#FFB800] hover:text-[#FFB800] transition-all duration-300"
                  >
                    All Lessons
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink
                    to={"/admin/allVocabularies"}
                    className="text-[#FFB800] hover:text-[#FFB800] transition-all duration-300"
                  >
                    All Vocabulary
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink
                    to={"/admin/allTutorials"}
                    className="text-[#FFB800] hover:text-[#FFB800] transition-all duration-300"
                  >
                    All Tutorials
                  </NavLink>
                </li>
              </ul>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeCongratulatoryModal}
                  className="bg-[#3EB68D] text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons..."
            className="w-full sm:w-1/2 p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
          />
        </div>

        {/* Filter Section */}
        <div className="filters-button flex justify-center mb-6 gap-6">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-6 py-2 rounded-md text-white ${
              filterStatus === "all" ? "bg-[#3EB68D]" : "bg-[#164193]"
            } transition-all duration-300`}
          >
            All Lessons
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-6 py-2 rounded-md text-white ${
              filterStatus === "completed" ? "bg-[#3EB68D]" : "bg-[#164193]"
            } transition-all duration-300`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilterStatus("incomplete")}
            className={`px-6 py-2 rounded-md text-white ${
              filterStatus === "incomplete" ? "bg-[#3EB68D]" : "bg-[#164193]"
            } transition-all duration-300`}
          >
            Incomplete
          </button>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {currentLessons.map((lesson) => {
            const isCompleted = currentUserData
              ? currentUserData.lessons.some(
                  (userLesson) =>
                    userLesson.lessonId.toString() === lesson._id.toString() &&
                    userLesson.completedStatus
                )
              : false;

            return (
              <div
                key={lesson._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-transform duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#3EB68D]">
                    {lesson.lessonTitle}
                  </h3>
                  {/* Badge for Completed/Incompleted */}
                  <div
                    className={`text-white px-3 py-1 rounded-full text-sm ${
                      isCompleted ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {isCompleted ? "Complete" : "Incomplete"}
                  </div>
                </div>
                <p className="text-[#2262A6] mb-1">
                  <strong>Lesson Number:</strong> {lesson.lessonNumber}
                </p>
                <p className="text-[#2262A6] mb-1">
                  <strong>Vocabulary Count:</strong>{" "}
                  {lesson.vocabularies.length}
                </p>
                <Link to={`/lessons/${lesson._id}`}>
                  <button className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity w-full mt-4">
                    Go to Lesson
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-4 mb-32">
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
    </div>
  );
};

export default UserAllLessons;
