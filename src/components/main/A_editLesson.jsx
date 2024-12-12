import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const A_editLesson = () => {
  const lessonDataFromLoader = useLoaderData();
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState({
    lessonTitle: "",
    lessonNumber: "",
  });

  // Update state when data from loader is available
  useEffect(() => {
    if (lessonDataFromLoader) {
      setLessonData({
        lessonTitle: lessonDataFromLoader.lessonTitle || "",
        lessonNumber: lessonDataFromLoader.lessonNumber || "",
      });
    }
  }, [lessonDataFromLoader]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLessonData({
      ...lessonData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://programminghero-job-ta-backend.vercel.app/admin/allLessons/${lessonDataFromLoader._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/admin/allLessons");
        toast.success("Lesson updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating lesson:", error);
        toast.error("Failed to update the lesson. Please try again.");
      });
  };

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold text-[#164193] mb-6">Edit Lesson</h2>

        <div className="mb-4">
          <label
            htmlFor="lessonTitle"
            className="block text-[#164193] font-medium mb-2"
          >
            Lesson Title
          </label>
          <input
            type="text"
            id="lessonTitle"
            name="lessonTitle"
            value={lessonData.lessonTitle}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#2262A6] rounded-lg focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D]"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lessonNumber"
            className="block text-[#164193] font-medium mb-2"
          >
            Lesson Number
          </label>
          <input
            type="number"
            id="lessonNumber"
            name="lessonNumber"
            value={lessonData.lessonNumber}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-[#2262A6] rounded-lg focus:outline-none focus:border-[#3EB68D] focus:ring-2 focus:ring-[#3EB68D]"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default A_editLesson;
