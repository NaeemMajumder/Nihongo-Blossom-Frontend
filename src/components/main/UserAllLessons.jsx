import React from "react";
import { Link } from "react-router-dom";

const UserAllLessons = () => {
  // Sample lessons data
  const lessons = [
    { id: 1, name: "Basic Greetings", number: 1, vocabCount: 12 },
    { id: 2, name: "Common Phrases", number: 2, vocabCount: 8 },
    { id: 3, name: "Numbers and Counting", number: 3, vocabCount: 15 },
    { id: 4, name: "Everyday Vocabulary", number: 4, vocabCount: 10 },
    { id: 5, name: "Time and Dates", number: 5, vocabCount: 6 },
  ];

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

        {/* Total Published Lessons */}
        <div className="bg-white shadow-md inline-block rounded-lg p-4 mb-6">
          <h2 className="text-xl font-medium text-[#164193]">
            Total Published Lessons:{" "}
            <span className="text-[#3EB68D] font-semibold">
              {lessons.length}
            </span>
          </h2>
        </div>

        {/* Lesson Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
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
      </div>
    </div>
  );
};

export default UserAllLessons;
