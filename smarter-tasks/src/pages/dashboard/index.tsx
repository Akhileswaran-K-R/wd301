import React from "react";

const Dashboard: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || " ");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dashboard
        </h1>
        <p>{userData?.name}</p>
        <p>{userData?.email}</p>
        <a href="" id="logout-link" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </>
  );
};

export default Dashboard;
