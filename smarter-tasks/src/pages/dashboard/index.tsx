import React from "react";

const Dashboard: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "");

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <a
          href=""
          id="logout-link"
          onClick={handleLogout}
          className="text-sm text-red-500 underline mb-6"
        >
          Logout
        </a>
      </div>

      <div className="text-center">
        <p className="text-xl font-semibold">{userData.name}</p>
        <p className="text-gray-600">{userData.email}</p>
      </div>
    </>
  );
};

export default Dashboard;
