import React, { useContext } from "react";
import MemeContext from "../ContextAPI/MemeContext";

const Leaderboard = () => {
  const { likedMemes, likes, darkMode } = useContext(MemeContext);

  const topMemes = [...likedMemes]
    .sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0))
    .slice(0, 10);

  return (
    <div
      className={`p-6 max-w-3xl mx-auto rounded-lg shadow-lg mt-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        🔥 Top 10 Most Liked Memes
      </h2>

      {topMemes.length === 0 ? (
        <p className="text-center text-gray-400">No memes liked yet! 😢</p>
      ) : (
        <ul className="space-y-4">
          {topMemes.map((meme, index) => (
            <li
              key={meme.id}
              className="flex items-center gap-4 p-3 rounded-md border shadow"
            >
              <span className="text-xl font-semibold">{index + 1}.</span>
              <img
                src={meme.url}
                alt={meme.name}
                className="w-16 h-16 rounded-md"
              />
              <p className="flex-1">{meme.name}</p>
              <span className="text-pink-500 font-bold">
                ❤️ {likes[meme.id] || 0}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
