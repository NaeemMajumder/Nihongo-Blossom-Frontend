import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const A_addVocabulary = () => {

  let navigate = useNavigate();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [whenToSay, setWhenToSay] = useState("");
  const [lessonNo, setLessonNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vocabulary Created:", { word, meaning, pronunciation, whenToSay, lessonNo });
    let newVocabulary = { word, meaning, pronunciation, whenToSay, lessonNo };
    console.log(newVocabulary);

    fetch("http://localhost:8080/admin/allVocabularies",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVocabulary),
    })
    .then(res => {
      if (!res.ok) {
        // If the response is not OK, throw an error with the status text
        return res.json().then(errorData => { throw new Error(errorData.message || 'Something went wrong') });
      }
      return res.json();
    })
    .then(data=>{
      console.log(data);
      navigate("/admin/allVocabularies")
    })  .catch(error => {
      console.error("Error:", error.message);
      // Optionally, you can display an error message in the UI
      alert(`Error: ${error.message}`);
    });
  };

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-xl">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-[#164193]">Add New Vocabulary</h1>
          <p className="mt-2 text-lg text-[#2262A6]">Add details for a new vocabulary word</p>
        </div>

        {/* Add Vocabulary Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Word */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">
              Word
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter the vocabulary word"
              required
            />
          </div>

          {/* Meaning */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">
              Meaning
            </label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter the meaning"
              required
            />
          </div>

          {/* Pronunciation */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">
              Pronunciation
            </label>
            <input
              type="text"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter pronunciation"
              required
            />
          </div>

          {/* When to Say */}
          <div>
            <label className="block text-[#164193] text-lg font-medium mb-2">
              When to Say
            </label>
            <input
              type="text"
              value={whenToSay}
              onChange={(e) => setWhenToSay(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter when to use the word"
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
              value={lessonNo}
              onChange={(e) => setLessonNo(e.target.value)}
              className="w-full p-4 border-2 border-[#2262A6] rounded-lg text-[#164193] focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D] shadow-md"
              placeholder="Enter lesson number"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Add Vocabulary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default A_addVocabulary;
