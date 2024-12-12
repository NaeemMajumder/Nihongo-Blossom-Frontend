import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const A_vocabDetails = () => {
  let vocabulary = useLoaderData();

  const navigate = useNavigate();
  const { word, meaning, pronunciation, whenToSay, lessonNo } =
    vocabulary || {};

  return (
    <div className="min-h-screen bg-[#EDF8FA] flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg border-2 border-[#2262A6]">
        <h1 className="text-[#164193] text-3xl font-bold text-center mb-6">
          Vocabulary Details
        </h1>

        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <span className="font-bold text-[#1CA288]">Word:</span>
            <span className="text-[#164193]">{word}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold text-[#1CA288]">Meaning:</span>
            <span className="text-[#164193]">{meaning}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold text-[#1CA288]">Pronunciation:</span>
            <span className="text-[#164193]">{pronunciation}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold text-[#1CA288]">When to Say:</span>
            <span className="text-[#164193]">{whenToSay}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="font-bold text-[#1CA288]">Lesson No:</span>
            <span className="text-[#164193]">{lessonNo}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-[#3AB092] text-white px-4 py-2 rounded-lg hover:bg-[#1CA288]"
            onClick={() => navigate("/admin/allVocabularies")}
          >
            Back to All Vocabularies
          </button>
        </div>
      </div>
    </div>
  );
};

export default A_vocabDetails;
