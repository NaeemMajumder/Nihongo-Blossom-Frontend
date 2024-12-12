import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Dashboard = () => {
  let { vocabularies, lessons, users } = useLoaderData();


  const lessonCount = vocabularies.length; 
  const vocabularyCount = lessons.length; 
  const userCount = users.length; 

  return (
    <div className="min-h-screen bg-[#EDF8FA] flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-[#164193] mb-8">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Lesson Count Card */}
        <Link to={"/admin/allLessons"}>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-[#3EB68D]">Lessons</h2>
            <p className="text-4xl font-extrabold text-[#2262A6]">
              {lessonCount}
            </p>
          </div>
        </Link>

        {/* Vocabulary Count Card */}
        <Link to={"/admin/allVocabularies"}>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-[#3EB68D]">Vocabularies</h2>
            <p className="text-4xl font-extrabold text-[#2262A6]">
              {vocabularyCount}
            </p>
          </div>
        </Link>

        {/* User Count Card */}
        <Link to={'/admin/allUsers'}>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-[#3EB68D]">Users</h2>
            <p className="text-4xl font-extrabold text-[#2262A6]">
              {userCount}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
