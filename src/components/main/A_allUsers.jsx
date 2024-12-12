import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";

const A_allUsers = () => {
  let initialUsers = useLoaderData();
  const [allUsers, setAllUsers] = useState(initialUsers); // Store users in state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedUserId, setSelectedUserId] = useState(null); // Store the selected user ID for confirmation
  const [action, setAction] = useState(""); // Action type: promote or demote

  const handlePromote = (id) => {
    setAction("promote");
    setSelectedUserId(id);
    setShowModal(true); // Show the modal for confirmation
  };

  const handleDemote = (id) => {
    setAction("demote");
    setSelectedUserId(id);
    setShowModal(true); // Show the modal for confirmation
  };

  const confirmAction = () => {
    let isAdmin = action === "promote" ? true : false;

    fetch(
      `https://programminghero-job-ta-backend.vercel.app/admin/allUsers/${selectedUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin }),
      }
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        // Update the state with the updated user data
        setAllUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUserId ? { ...user, isAdmin } : user
          )
        );
        setShowModal(false); // Close the modal after the action is performed
      })
      .catch((error) => {
        setShowModal(false); // Close the modal on error
      });
  };

  const cancelAction = () => {
    setShowModal(false); // Close the modal if the action is canceled
  };

  return (
    <>
      <Helmet>
        <title>All Tutorials</title>
        <meta
          name="description"
          content="This is a custom description for my page."
        />
        <meta name="keywords" content="React, Helmet, SEO, Meta Tags" />
      </Helmet>
      <div className="bg-[#EDF8FA] p-6 min-h-screen">
        <div className="max-w-[1350px] m-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-[#164193]">
              Manage Users
            </h1>
          </div>

          {/* Total Users Count */}
          <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-medium text-[#164193]">
              Total Users:{" "}
              <span className="text-[#3EB68D] font-semibold">
                {allUsers.length}
              </span>
            </h2>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-[#164193] text-white">
                  <th className="p-4 text-left">User Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      {user.isAdmin ? "Admin" : "Normal User"}
                    </td>
                    <td className="p-4">
                      {/* Actions */}
                      {user.isAdmin ? (
                        <button
                          onClick={() => handleDemote(user._id)}
                          className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                        >
                          Demote to User
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePromote(user._id)}
                          className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                        >
                          Promote to Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold text-[#164193] mb-4">
                Are you sure you want to {action} this user?
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={confirmAction}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelAction}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default A_allUsers;
