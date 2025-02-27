import React, { useContext, useCallback } from "react";
import MemeContext from "../ContextAPI/MemeContext";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

const MemeExplorer = () => {
  const { memes, loading, error, setSearchQuery, category, setCategory } =
    useContext(MemeContext);

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  if (loading) return <div className="text-center mt-10">Loading memes...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search memes..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4 dark:bg-gray-800 dark:text-white"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div className="flex justify-between mb-4">
        <select
          className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="trending">🔥 Trending</option>
          <option value="new">🆕 New</option>
          <option value="classic">🎭 Classic</option>
          <option value="random">🎲 Random</option>
        </select>

        <select className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white">
          <option value="date">📅 Date</option>
          <option value="likes">❤️ Likes</option>
          <option value="comments">💬 Comments</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {memes.map((meme) => (
          <Link to={`/meme/${meme.id}`} key={meme.id}>
            <li
              key={meme.id}
              className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <p className="text-center mt-2 font-semibold">{meme.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MemeExplorer;
