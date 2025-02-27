import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MemeContext from "../ContextAPI/MemeContext";

const NotFound = () => {
  const { darkMode } = useContext(MemeContext);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-6 text-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-4">😱 Oops! 404 - Page Not Found</h1>
      <p className="text-lg mb-6">Looks like you took a wrong turn... but here's a meme! 😆</p>

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhqHcjDukWGmZEpdu3CINtPYm3xjLnCsQMgwjgPZPgBMReJCHMC4N-z-w49rUGm1iFWp8&usqp=CAU"
        alt="404 Meme"
        className="w-80 rounded-lg shadow-lg mb-6"
      />

      <Link to="/" className="px-6 py-3 bg-pink-500 text-white font-bold rounded-lg shadow-md hover:bg-pink-600">
        🔙 Go Home
      </Link>
    </div>
  );
};

export default NotFound;
