import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom"; // For navigation
import { CiPlay1 } from "react-icons/ci";
import "../../styles/adminLoginBtn.css";
import { AuthContext } from "../provider/AuthProvider";

const A_lessonDetails = () => {
  let { user } = useContext(AuthContext);
  console.log(user.email);

  // Safely load data from useLoaderData()
  let lesson = useLoaderData() || {}; // Default to an empty object if undefined
  let vocabularies = lesson.vocabularies || []; // Default to an empty array if undefined

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle text-to-speech
  const playPronunciation = (text) => {
    if (text) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "ja-JP"; // Set to Japanese
      window.speechSynthesis.speak(speech);
    }
  };

  // Navigate to the next vocabulary
  const handleNext = () => {
    if (currentIndex < vocabularies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Navigate to the previous vocabulary
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentVocabulary = vocabularies[currentIndex] || {}; // Default to an empty object if undefined

  return (
    <div className="bg-[#EDF8FA] min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-[600px] w-full bg-white shadow-lg rounded-lg p-6 text-center">
        {/* Lesson Details Section */}
        <div className="border-b-2 pb-6 mb-8 bg-white rounded-lg shadow-sm shadow-[#3AB092] hover:shadow-md transition-shadow duration-300 ease-in-out p-6">
          {/* Back Button */}
          <Link to="/admin/allLessons">
            <button className="text-[#164193] font-semibold text-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span>&larr;</span> <span>Back to Lessons</span>
            </button>
          </Link>

          {/* Lesson Info */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-[#164193] mb-2">
              {lesson.lessonNumber}. {lesson.lessonTitle || "Lesson Title"} {/* Default if lessonTitle is missing */}
            </h2>
            {/* Optional description rendering */}
            {lesson.description && (
              <p className="text-lg text-[#2262A6]">{lesson.description}</p>
            )}
          </div>
        </div>

        {/* Vocabulary Word */}
        <h1
          className="text-4xl font-bold text-[#3EB68D] cursor-pointer mb-4"
          onClick={() => playPronunciation(currentVocabulary.pronunciation)}
        >
          {currentVocabulary.word || "Vocabulary Word"} {/* Default if word is missing */}
        </h1>

        {/* Vocabulary Details Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table className="w-full table-auto text-[#164193] text-lg">
            <tbody>
              {/* Meaning Row */}
              <tr className="bg-white">
                <td className="px-6 py-3 border-b border-[#2262A6] font-semibold">
                  Meaning
                </td>
                <td className="px-6 py-3 border-b border-[#2262A6]">
                  {currentVocabulary.meaning || "Meaning not available"}
                </td>
              </tr>

              {/* Pronunciation Row */}
              <tr className="bg-[#F9FAFB]">
                <td className="px-6 py-3 border-b border-[#2262A6] font-semibold">
                  Pronunciation
                </td>
                <td className="px-6 py-3 border-b border-[#2262A6]">
                  {currentVocabulary.pronunciation || "Pronunciation not available"}
                </td>
              </tr>

              {/* When to Say Row */}
              <tr className="bg-white">
                <td className="px-6 py-3 border-b border-[#2262A6] font-semibold">
                  When to Say
                </td>
                <td className="px-6 py-3 border-b border-[#2262A6]">
                  {currentVocabulary.whenToSay || "Information not available"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Navigation Buttons */}
        <div className="button-container flex justify-between mt-6">
          <button
            className={`bg-gradient-to-br from-[#164193] to-[#2262A6] text-white px-4 py-2 rounded-lg shadow-md font-semibold transition-transform duration-300 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105"
            }`}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>

          <button
            className={`bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-4 py-2 rounded-lg shadow-md font-semibold transition-transform duration-300 ${
              currentIndex === vocabularies.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105"
            }`}
            onClick={handleNext}
            disabled={currentIndex === vocabularies.length - 1}
          >
            Next
          </button>
        </div>

        {/* Pagination Info */}
        <p className="mt-4 text-[#164193] font-medium">
          Vocabulary {currentIndex + 1} of {vocabularies.length}
        </p>

        {/* Pronunciation Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => playPronunciation(currentVocabulary.pronunciation)}
            className="bg-[#3EB68D] flex justify-center items-center gap-2 text-white px-6 py-2 rounded-lg shadow-md font-semibold mt-4 hover:scale-105 transition-transform"
          >
            <CiPlay1 /> Play Pronunciation
          </button>
        </div>
      </div>
    </div>
  );
};

export default A_lessonDetails;
