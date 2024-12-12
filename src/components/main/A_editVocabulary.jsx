import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const A_editVocabulary = ({ onSave }) => {
  const vocabulary = useLoaderData();
  
  let navigate = useNavigate();

  const [word, setWord] = useState(vocabulary?.word || "");
  const [meaning, setMeaning] = useState(vocabulary?.meaning || "");
  const [pronunciation, setPronunciation] = useState(vocabulary?.pronunciation || "");
  const [whenToSay, setWhenToSay] = useState(vocabulary?.whenToSay || "");
  const [lessonNo, setLessonNo] = useState(vocabulary?.lessonNo || "");

  const handleSave = (e) => {
    e.preventDefault();
    const updatedVocabulary = { word, meaning, pronunciation, whenToSay, lessonNo };

    fetch(`http://localhost:8080/admin/allVocabularies/${vocabulary._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVocabulary),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/admin/allVocabularies");
          toast.success("Vocabulary Update Successfully!");
        });
    };

  return (
    <div className="min-h-screen bg-[#EDF8FA] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border-2 border-[#2262A6]">
        <h1 className="text-3xl text-[#164193] font-bold text-center mb-6">
          Edit Vocabulary
        </h1>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-[#1CA288] font-bold mb-1" htmlFor="word">
              Word
            </label>
            <input
              type="text"
              id="word"
              className="w-full p-2 border-2 border-[#2262A6] rounded-lg bg-[#EDF8FA] text-[#164193]"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[#1CA288] font-bold mb-1" htmlFor="meaning">
              Meaning
            </label>
            <textarea
              id="meaning"
              className="w-full p-2 border-2 border-[#2262A6] rounded-lg bg-[#EDF8FA] text-[#164193] resize-none"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label
              className="block text-[#1CA288] font-bold mb-1"
              htmlFor="pronunciation"
            >
              Pronunciation
            </label>
            <input
              type="text"
              id="pronunciation"
              className="w-full p-2 border-2 border-[#2262A6] rounded-lg bg-[#EDF8FA] text-[#164193]"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-[#1CA288] font-bold mb-1"
              htmlFor="whenToSay"
            >
              When to Say
            </label>
            <input
              type="text"
              id="whenToSay"
              className="w-full p-2 border-2 border-[#2262A6] rounded-lg bg-[#EDF8FA] text-[#164193]"
              value={whenToSay}
              onChange={(e) => setWhenToSay(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-[#1CA288] font-bold mb-1"
              htmlFor="lessonNo"
            >
              Lesson No
            </label>
            <input
              type="number"
              id="lessonNo"
              className="w-full p-2 border-2 border-[#2262A6] rounded-lg bg-[#EDF8FA] text-[#164193]"
              value={lessonNo}
              onChange={(e) => setLessonNo(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <button
              type="submit"
              className="bg-[#3AB092] text-white px-4 py-2 rounded-lg hover:bg-[#1CA288]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-[#2262A6] text-white px-4 py-2 rounded-lg hover:bg-[#164193]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default A_editVocabulary;
