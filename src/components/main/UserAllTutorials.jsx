import React from "react";
import { Link } from "react-router-dom"; // For navigation
import { FaArrowLeft } from "react-icons/fa";

const UserAllTutorials = () => {
  // Array of YouTube video IDs and their titles
  const videoLinks = [
    { id: "https://www.youtube.com/embed/AX6OrbgS8lI?si=Pvvjp27na_Mlzkvf", title: "Japanese Greetings Japanese Greetings Japanese Greetings" },
    { id: "your_video_id_2", title: "Basic Japanese Phrases" },
    { id: "your_video_id_3", title: "Learning Hiragana" },
    { id: "your_video_id_4", title: "Kanji Basics" },
    { id: "your_video_id_5", title: "Introduction to Japanese Culture" },
    { id: "your_video_id_6", title: "Japanese Grammar Tips" },
    { id: "your_video_id_7", title: "Essential Japanese Vocabulary" },
    { id: "your_video_id_8", title: "Mastering Japanese Pronunciation" },
    { id: "your_video_id_9", title: "Japanese Conversation Practice" },
    { id: "your_video_id_10", title: "Understanding Japanese Syntax" },
  ];

  return (
    <div className="bg-[#EDF8FA] min-h-screen p-6 flex flex-col items-center">
      {/* Back Button */}
      <Link to="/lessons" className="text-[#164193] font-semibold text-lg flex items-center gap-2 hover:opacity-90 transition-opacity mb-6">
        <FaArrowLeft /> Back to Lessons
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#3EB68D] mb-6">Japanese Language Learning Tutorials</h1>

      {/* Tutorial Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl">
        {videoLinks.map((video, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Video */}
            <iframe
              width="100%"
              height="315"
              src={video.id}
              title={`Japanese Tutorial ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Video Title */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#164193]">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAllTutorials;
