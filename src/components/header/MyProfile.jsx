import React, { useContext } from "react";

import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

const MYProfile = () => {
  let { user, updateUserProfile } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // Get values from the form
    const formData = new FormData(e.target);
    const updatedName = formData.get("name");
    const updatedPhotoURL = formData.get("photoURL");

    // Call the updateUser function to update user info (you need to define this in AuthProvider)
    updateUserProfile({ displayName: updatedName, photoURL: updatedPhotoURL })
      .then(() => {
        toast.success("Profile Updated");
      })
      .catch((error) => toast.error("something went wrong"));

    setIsModalOpen(false);
  };

  return (
    <>
      {/* <Helmet>
        <title>My Profile | Carrier Hub</title>
        <meta
          name="description"
          content="This is a custom description for my page."
        />
        <meta name="keywords" content="React, Helmet, SEO, Meta Tags" />
      </Helmet> */}
      <div className="min-h-screen bg-gradient-to-b from-[#37AFE1] via-[#4CC9FE] to-[#FFFECB] flex flex-col items-center justify-center py-12">
        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
          <div className="relative mb-6">
            {/* Profile Image */}
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-[#37AFE1] mx-auto"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-[#37AFE1] rounded-full shadow-md">
              <i className="fas fa-camera text-white text-xl"></i>{" "}
              {/* Optional camera icon */}
            </div>
          </div>

          {/* Name */}
          <h2 className="text-3xl font-bold text-[#091E3E] mb-2">
            {user.displayName}
          </h2>

          {/* Email */}
          <p className="text-lg text-gray-600 mb-4">{user.email}</p>

          {/* Button to Edit Profile */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2 px-4 bg-[#37AFE1] text-white rounded-lg hover:bg-[#4CC9FE] transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Modal for Editing Profile */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-2xl font-bold text-[#091E3E] mb-4">
                Edit Profile
              </h2>

              {/* Profile Edit Form */}
              <form onSubmit={handleProfileSubmit}>
                {/* Name Input */}
                <input
                  type="text"
                  name="name"
                  defaultValue={user.displayName}
                  placeholder="Enter your new name"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#37AFE1]"
                />

                {/* Photo URL Input */}
                <input
                  type="text"
                  name="photoURL"
                  defaultValue={user.photoURL}
                  placeholder="Enter your photo URL"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#37AFE1]"
                />

                {/* Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#37AFE1] text-white rounded-lg hover:bg-[#4CC9FE] transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MYProfile;
