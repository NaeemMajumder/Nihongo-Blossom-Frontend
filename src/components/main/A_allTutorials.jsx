import React from "react";
import { Link, useLoaderData } from "react-router-dom"; // For navigation
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa"; // For edit and delete icons

const A_allTutorials = () => {

  let allTutorials = useLoaderData();
  console.log(allTutorials);
  // Array of YouTube video IDs and their titles
  const videoLinks = [
    {
      id: "asd",
      title: "Japanese Greetings Japanese Greetings Japanese Greetings",
    },
    { id: "asdf", title: "Basic Japanese Phrases" },
    { id: "asdf", title: "Learning Hiragana" },
    { id: "asdf", title: "title"},
    { id: "your_video_id_5", title: "Introduction to Japanese Culture" },
    { id: "your_video_id_6", title: "Japanese Grammar Tips" },
    { id: "your_video_id_7", title: "Essential Japanese Vocabulary" },
    { id: "your_video_id_8", title: "Mastering Japanese Pronunciation" },
    { id: "your_video_id_9", title: "Japanese Conversation Practice" },
    { id: "your_video_id_10", title: "Understanding Japanese Syntax" },
  ];

  // Handle edit tutorial
  const handleEdit = (id) => {
    console.log(`Editing tutorial with id: ${id}`);
    // Add your edit logic here (e.g., navigate to edit page)
  };

  // Handle delete tutorial
  const handleDelete = (id) => {
    console.log(`Deleting tutorial with id: ${id}`);
    // Add your delete logic here (e.g., API call to delete tutorial)
  };

  // Handle add new tutorial
  const handleAddTutorial = () => {
    console.log("Adding a new tutorial");
    // Add your add tutorial logic here (e.g., navigate to add tutorial page)
  };

  return (
    <div className="bg-[#EDF8FA] min-h-screen p-6 flex flex-col items-center">

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#3EB68D] mb-6">
        Japanese Language Learning Tutorials
      </h1>

      <div className="flex justify-between items-center mb-6 w-full max-w-6xl">
        {/* Total Tutorials Button */}
        <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-medium text-[#164193]">
            Total Tutorials: {" "}
            <span className="text-[#3EB68D] font-semibold">
              {videoLinks.length}
            </span>
          </h2>
        </div>

        {/* Add Tutorial Button */}
        <div className="flex items-center">
          <Link to="/admin/addTutorial">
          <button className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                Add Tutorials +
              </button>
          </Link>
        </div>
      </div>

      {/* Tutorial Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl mb-20">
        {allTutorials.map((video, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Video */}
            <iframe
              width="100%"
              height="315"
              src={video.videoURL}
              title={`Japanese Tutorial ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Video Title and Actions */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-[#164193]">
                  {video.videoTitle}
                </h3>
              </div>
              <div className="flex gap-3">
                {/* Edit Button */}
                <button
                  title="edit tutorial"
                  onClick={() => handleEdit(index)}
                  className="text-[#3EB68D] hover:text-[#164193] transition-colors"
                >
                  <FaEdit size={20} />
                </button>
                {/* Delete Button */}
                <button
                  title="Delete tutorial"
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-[#164193] transition-colors"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default A_allTutorials;
