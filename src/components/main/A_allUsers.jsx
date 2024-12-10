import React from "react";

const A_allUsers = () => {
  // Sample user data (replace with dynamic data later)
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "NormalUser" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "NormalUser" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "NormalUser" },
  ];

  const handlePromote = (id) => {
    console.log(`Promote user with ID: ${id} to Admin`);
    // Add the logic to promote the user to Admin
  };

  const handleDemote = (id) => {
    console.log(`Demote user with ID: ${id} to NormalUser`);
    // Add the logic to demote the user to NormalUser
  };

  return (
    <div className="bg-[#EDF8FA] p-6 min-h-screen">
      <div className="max-w-[1350px] m-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-[#164193]">Manage Users</h1>
        </div>

        {/* Total Users Count */}
        <div className="bg-white inline-block shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-medium text-[#164193]">
            Total Users:{" "}
            <span className="text-[#3EB68D] font-semibold">
              {users.length}
            </span>
          </h2>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="table-auto w-full">
            <thead>
              <tr  className="bg-[#164193] text-white">
                <th className="p-4 text-left">User Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">
                    {/* Actions */}
                    {user.role === "NormalUser" ? (
                      <button
                        onClick={() => handlePromote(user.id)}
                        className="bg-gradient-to-br from-[#3EB68D] to-[#2262A6] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                      >
                        Promote to Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDemote(user.id)}
                        className="bg-gradient-to-br from-[#164193] to-[#00a9ff] text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                      >
                        Demote to User
                      </button>
                    )}
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

export default A_allUsers;
