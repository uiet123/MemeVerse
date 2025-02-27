import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import MemeContext from "../ContextAPI/MemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const { trending, darkMode } = useContext(MemeContext);
  const [memeOfTheDay, setMemeOfTheDay] = useState(null);
  const groupRefs = useRef([]);

  useEffect(() => {
    if (trending.length > 0) {
      const randomMeme = trending[Math.floor(Math.random() * trending.length)];
      setMemeOfTheDay(randomMeme);
    }
  }, [trending]);

  useEffect(() => {
    groupRefs.current.forEach((group, index) => {
      if (!group) return;

      gsap.from(
        group,
        { scale: 1 },
        {
          scrollTrigger: {
            trigger: group,
            start: "top center",
            end: "top 100px",
            scrub: true,
          },
        }
      );
    });
  }, [trending]);

  return (
    <div
      className={`p-6 text-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1
        className={`text-4xl sm:text-5xl md:text-6xl font-extrabold ${
          darkMode ? "text-yellow-400" : "text-indigo-600"
        }`}
      >
        Aur bhai!!! <br />
        <span
          className={`text-3xl sm:text-4xl md:text-5xl ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Aaja tujhe memes dikhata hu
        </span>
      </h1>

      {memeOfTheDay && (
        <div className="mt-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold">Meme of the Day 🤩</h2>
          <div className="relative mt-4 shadow-xl transition-all duration-300 hover:scale-105 rounded-3xl overflow-hidden">
            <img
              src={memeOfTheDay.url}
              alt={memeOfTheDay.name}
              className="w-full max-w-xl"
            />
            <p className="absolute bottom-0 left-0 right-0 p-2 text-lg font-semibold bg-black bg-opacity-70 text-white">
              {memeOfTheDay.name}
            </p>
          </div>
        </div>
      )}

      <div
        className={`sticky top-0 z-20 py-4 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h2
          className={`text-4xl mt-10 font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Trending Memes 📢
        </h2>
      </div>

      <div className="max-w-5xl mx-auto p-4 space-y-8">
        {trending
          .reduce((acc, meme, index) => {
            if (index % 3 === 0) acc.push([]);
            acc[acc.length - 1].push(meme);
            return acc;
          }, [])
          .map((group, groupIndex) => (
            <div
              key={groupIndex}
              ref={(el) => (groupRefs.current[groupIndex] = el)}
              className="sticky top-35 bg-gray-900 p-4 z-10 transition-opacity duration-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((meme) => (
                  <Link to={`/meme/${meme.id}`} key={meme.id}>
                    <div
                      className="p-4 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white text-black cursor-pointer 
                    flex flex-col items-center justify-between h-[400px] w-full overflow-hidden"
                    >
                      <img
                        src={meme.url}
                        alt={meme.name}
                        className="w-full h-[300px] object-cover"
                      />
                      <p className="mt-2 text-lg font-semibold text-center">
                        {meme.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Homepage;
