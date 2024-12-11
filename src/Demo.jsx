import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { MdOutlineCelebration } from "react-icons/md";
import { FaCheck } from "react-icons/fa"; // Import tick icon
import Confetti from "react-confetti";
import { CiPlay1 } from "react-icons/ci";
import './styles/adminLoginBtn.css'

const Demo = () => {
  // Sample data for vocabulary (replace with dynamic data later)
  const vocabularies = [
    {
      id: 1,
      word: "こんにちは",
      meaning: "Hello",
      pronunciation: "Konnichiwa",
      whenToSay: "Use this word to greet someone during the day.",
    },
    {
      id: 2,
      word: "ありがとう",
      meaning: "Thank you",
      pronunciation: "Arigatou",
      whenToSay: "Use this to express gratitude.",
    },
    // More vocabulary data...
  ];

  // Sample lesson data
  const lesson = {
    name: "Basic Greetings",
    lessonNo: 1,
    description: "Learn basic Japanese greetings.",
  };
  const navigate = useNavigate(); // Hook for navigation after confetti
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const [isComplete, setIsComplete] = useState(false); // Track if lesson is completed

  // Function to handle text-to-speech
  const playPronunciation = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ja-JP"; // Set to Japanese
    window.speechSynthesis.speak(speech);
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

  // Handle completion of the vocabulary list
  const handleComplete = () => {
    setShowConfetti(true); // Show confetti when complete
    setIsComplete(true); // Mark the lesson as complete
    setTimeout(() => {
      setShowConfetti(false); // Hide confetti after 3 seconds
      navigate("/lessons");
    }, 3000);
  };

  const currentVocabulary = vocabularies[currentIndex];

  return (
    <div className="bg-[#EDF8FA] min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-[600px] w-full bg-white shadow-lg rounded-lg p-6 text-center">
        {/* Confetti Component */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            gravity={0.3}
            colors={["#FF0000", "#FFFF00", "#32CD32", "#FFD700", "#8A2BE2"]}
            recycle={false}
          />
        )}

        {/* Lesson Details Section */}
        <div className="border-b-2 pb-6 mb-8 bg-white rounded-lg shadow-sm shadow-[#3AB092] hover:shadow-md transition-shadow duration-300 ease-in-out p-6">
          {/* Back Button */}
          <Link to="/lessons">
            <button className="text-[#164193] font-semibold text-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span>&larr;</span> <span>Back to Lessons</span>
            </button>
          </Link>

          {/* Lesson Info */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-[#164193] mb-2">
              {lesson.name}
            </h2>
            <p className="text-[#2262A6] text-lg">{lesson.description}</p>
          </div>
        </div>

        {/* Vocabulary Word */}
        <h1
          className="text-4xl font-bold text-[#3EB68D] cursor-pointer mb-4"
          onClick={() => playPronunciation(currentVocabulary.pronunciation)}
        >
          {currentVocabulary.word}
        </h1>

        {/* Vocabulary Details */}
        <p className="text-lg text-[#2262A6] mb-2">
          <strong>Meaning:</strong> {currentVocabulary.meaning}
        </p>
        <p className="text-lg text-[#2262A6] mb-2">
          <strong>Pronunciation:</strong> {currentVocabulary.pronunciation}
        </p>
        <p className="text-lg text-[#2262A6] mb-4">
          <strong>When to Say:</strong> {currentVocabulary.whenToSay}
        </p>

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

          {/* Show Complete Button when it's the last vocabulary */}
          {currentIndex === vocabularies.length - 1 ? (
            <button
              onClick={handleComplete}
              className={`${
                isComplete ? "bg-[#32CD32]" : "bg-[#3EB68D]"
              } flex justify-center items-center gap-1 text-white px-8 py-3 rounded-lg shadow-md font-semibold transition-all duration-300 hover:scale-105`}
            >
              {isComplete ? (
                <FaCheck className="inline-block text-xl mr-2" />
              ) : (
                <MdOutlineCelebration className="inline-block text-xl mr-2" />
              )}
              {isComplete ? "Completed" : "Complete"}
            </button>
          ) : (
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
          )}
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

export default Demo;
