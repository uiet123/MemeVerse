import React, { useContext, useState, useEffect } from "react";
import MemeContext from "../ContextAPI/MemeContext";

const UserProfile = () => {
  const { uploadedMemes, likedMemes, darkMode } = useContext(MemeContext);

  const [name, setName] = useState(
    localStorage.getItem("profileName") || "John Doe"
  );
  const [bio, setBio] = useState(
    localStorage.getItem("profileBio") || "Meme lover & creator 🎭"
  );
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic")
  );
  const [editing, setEditing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfilePic(imageUrl);
        localStorage.setItem("profilePic", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileBio", bio);
    setEditing(false);
  };

  return (
    <div
      className={`p-4 sm:p-6 w-full max-w-3xl mx-auto rounded-xl shadow-lg border mt-5 
        ${
          darkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-gray-100 text-black border-gray-300"
        }
      `}
    >
      <div className="flex items-center flex-col mb-6">
        <label htmlFor="profile-pic" className="cursor-pointer relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg mb-3 object-cover"
          />
          {editing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">Change</span>
            </div>
          )}
        </label>
        {editing && (
          <input
            type="file"
            id="profile-pic"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        )}

        {editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-bold text-center bg-transparent border-b border-blue-400 outline-none w-2/3"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="text-center mt-2 bg-transparent border-b border-blue-400 outline-none w-2/3"
            />
            <button
              onClick={handleSave}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-400">{bio}</p>
            <button
              onClick={() => setEditing(true)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      <h2
        className={`text-2xl sm:text-3xl font-bold text-center mb-5 ${
          darkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        Your Uploaded Memes 🎉
      </h2>

      {uploadedMemes.length === 0 ? (
        <p className="text-center text-gray-400">No memes uploaded yet! 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {uploadedMemes.map((meme) => (
            <div
              key={meme.id}
              className={`p-4 rounded-lg shadow-md transition transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-400"
              }`}
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p
                className={`text-center mt-2 font-semibold ${
                  darkMode ? "text-green-300" : "text-green-600"
                }`}
              >
                {meme.name}
              </p>
            </div>
          ))}
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl font-bold text-center mt-8 mb-5 ${
          darkMode ? "text-red-400" : "text-red-600"
        }`}
      >
        Your Liked Memes ❤️
      </h2>

      {likedMemes.length === 0 ? (
        <p className="text-center text-gray-400">No memes liked yet! 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {likedMemes.map((meme) => (
            <div
              key={meme.id}
              className={`p-4 rounded-lg shadow-md transition transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-400"
              }`}
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p
                className={`text-center mt-2 font-semibold ${
                  darkMode ? "text-green-300" : "text-green-600"
                }`}
              >
                {meme.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
