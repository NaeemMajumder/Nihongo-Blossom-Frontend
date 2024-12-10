import React from "react";

const A_allLessons = () => {
  // Sample lesson data (replace with dynamic data later)
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
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#164193] mb-4 sm:mb-0">
            Manage Lessons
          </h1>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
            <button className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300">
              Add Lesson
            </button>
          </div>
        </div>

        {/* Total Lessons Count */}
        <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-medium text-[#164193]">
            Total Lessons:{" "}
            <span className="text-[#3EB68D] font-semibold">{lessons.length}</span>
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
              <p className="text-[#2262A6]">
                <strong>Vocabulary Count:</strong> {lesson.vocabCount}
              </p>
              <div className="flex justify-between mt-4">
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
      </div>
    </div>
  );
};

export default A_allLessons;
