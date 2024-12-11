import React, { useState } from "react";

const A_addLessons = () => {
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lesson Created:", { lessonName, lessonNumber });
    // Add logic to handle lesson creation, like making an API request
  };

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-xl">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-[#164193]">Create New Lesson</h1>
          <p className="mt-2 text-lg text-[#2262A6]">Add details for the new lesson</p>
        </div>

        {/* Add Lesson Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lesson Name */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">
              Lesson Name
            </label>
            <input
              type="text"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter lesson name (e.g., Basic Greetings)"
              required
            />
          </div>

          {/* Lesson Number */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">
              Lesson Number
            </label>
            <input
              type="number"
              value={lessonNumber}
              onChange={(e) => setLessonNumber(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter unique lesson number (e.g., 1, 2, 3)"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Create Lesson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default A_addLessons;
