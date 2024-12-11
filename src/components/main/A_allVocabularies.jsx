import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const A_allVocabularies = () => {
  const { allVocabularies, lessons } = useLoaderData();

  console.log(allVocabularies);
  console.log(lessons);


  const [filteredLesson, setFilteredLesson] = useState("");

  // Filter vocabularies based on lesson number
  const filteredVocabularies = allVocabularies.filter(
    (vocab) => !filteredLesson || vocab.lessonNo === parseInt(filteredLesson)
  );

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen">
      <div className="max-w-[1350px] m-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#164193] mb-4 sm:mb-0">
            Manage Vocabularies
          </h1>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
            <Link to={"/admin/addVocabulary"}>
              <button className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                Add Vocabulary +
              </button>
            </Link>
          </div>
        </div>

        {/* Wrapper div for Total Vocabularies and Filter by Lesson */}
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          {/* Total Vocabularies Count */}
          <div className="flex justify-center items-center w-full sm:w-auto">
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 sm:mb-0">
              <h2 className="text-xl font-medium text-[#164193]">
                Total Vocabularies:{" "}
                <span className="text-[#3EB68D] font-semibold">
                  {filteredVocabularies.length}
                </span>
              </h2>
            </div>
          </div>

          {/* Filter by Lesson */}
          <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6 sm:mb-0 w-full sm:w-auto">
            <h2 className="text-xl font-medium text-[#164193]">
              Filter by Lesson Number
            </h2>
            <select
              className="mt-2 p-2 bg-[#EDF8FA] text-[#164193] border-2 border-[#2262A6] rounded-lg"
              value={filteredLesson}
              onChange={(e) => setFilteredLesson(e.target.value)}
            >
              <option value="">All Lessons</option>
              {lessons.map((lesson, index) => (
                // Assuming lesson has a lessonNumber or lessonTitle property
                <option key={index} value={lesson.lessonNumber}>
                  Lesson {lesson.lessonNumber}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vocabulary Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-[#164193] text-white">
                <th className="p-4">Word</th>
                <th className="p-4">Meaning</th>
                <th className="p-4">Pronunciation</th>
                <th className="p-4">When to Say</th>
                <th className="p-4">Lesson No</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVocabularies.map((vocab, index) => (
                <tr
                  key={index}
                  className="border-b border-[#2262A6] hover:bg-[#C9E5E9]"
                >
                  <td className="p-4">{vocab.word}</td>
                  <td className="p-4">{vocab.meaning}</td>
                  <td className="p-4">{vocab.pronunciation}</td>
                  <td className="p-4">{vocab.whenToSay}</td>
                  <td className="p-4">{vocab.lessonNo}</td>
                  <td className="p-4">
                    <Link to={`/admin/vocabularyDetails/${vocab.id}`}>
                      <button className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity mr-2 mb-2 lg:mb-0">
                        Details
                      </button>
                    </Link>
                    <button className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition-opacity mr-2 mb-2 lg:mb-0">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default A_allVocabularies;
