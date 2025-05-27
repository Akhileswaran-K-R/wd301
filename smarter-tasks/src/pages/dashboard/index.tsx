import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();  
  const rawUserData = localStorage.getItem("userData");

  let userData;
  try {
    userData = rawUserData ? JSON.parse(rawUserData) : null;
  } catch {
    localStorage.removeItem("authToken");
    navigate("/signin");
  }

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <a
          href="/signin"
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
