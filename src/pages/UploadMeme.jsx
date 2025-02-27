import React, { useState, useContext } from "react";
import MemeContext from "../ContextAPI/MemeContext";

const UploadMeme = () => {
  const { handleUpload, darkMode } = useContext(MemeContext);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    handleUpload(image, caption);
    alert("Meme uploaded successfully!");

    setImage(null);
    setCaption("");
    setPreview(null);
  };

  return (
    <div
      className={`px-4 mt-15 py-5 max-w-md sm:max-w-sm w-full mx-auto rounded-lg shadow-lg border-2 mt-5
        ${
          darkMode
            ? "bg-gray-900 text-white border-pink-500"
            : "bg-gray-100 text-black border-gray-300"
        }
      `}
    >
      <h2
        className={`text-2xl sm:text-3xl font-bold text-center mb-4 animate-pulse 
          ${darkMode ? "text-green-400" : "text-green-600"}
        `}
      >
        Upload Your Meme 😆
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={`w-full p-3 sm:p-2 border rounded focus:ring-2 transition duration-300 
            ${
              darkMode
                ? "bg-gray-700 border-green-400 focus:border-green-500 focus:ring-green-400"
                : "bg-white border-gray-400 focus:border-blue-500 focus:ring-blue-400"
            }
          `}
        />
        <input
          type="text"
          placeholder="Add a funny caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={`w-full p-3 sm:p-2 border rounded focus:ring-2 transition duration-300 
            ${
              darkMode
                ? "bg-gray-700 border-blue-400 focus:border-blue-500 focus:ring-blue-400"
                : "bg-white border-gray-400 focus:border-blue-500 focus:ring-blue-400"
            }
          `}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className={`w-full h-auto rounded-lg shadow-lg mt-2 transition-all transform hover:scale-105 
              ${
                darkMode
                  ? "border-2 border-cyan-400"
                  : "border-2 border-gray-400"
              }
            `}
          />
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 p-3 sm:p-2 rounded text-white text-lg sm:text-sm font-bold transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          Upload Meme 🚀
        </button>
      </form>
    </div>
  );
};

export default UploadMeme;
