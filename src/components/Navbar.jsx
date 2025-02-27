import { useContext, useEffect, useRef } from "react";
import MemeContext from "../ContextAPI/MemeContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Navbar = () => {
  const { darkMode, toggleDarkMode, isOpen, toggleMenu } =
    useContext(MemeContext);
  const navigate = useNavigate();

  const logoRef = useRef(null);
  const darkRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 0.8,
    });
    tl.to(darkRef.current, {
      rotate: 360,
      scale: 1.5,
      duration: 0.8,
    });
    tl.to(menuRef.current.children, {
      rotate: 360,
    });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <div
      className="p-4 bg-gray-200 dark:bg-gray-900 text-white 
                shadow-md shadow-gray-500 dark:shadow-gray-800
                drop-shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h1
          ref={logoRef}
          onClick={() => handleNavigation("/")}
          className={`text-2xl ml-8 hover:scale-115 font-bold text-indigo-400 transition duration-300 cursor-pointer  ${
            darkMode
              ? "text-yellow-400 hover:text-yellow-300"
              : "text-indigo-500 hover:text-indigo-400"
          } `}
        >
          MemeVerse
        </h1>

        <ul ref={menuRef} className="hidden sm:flex space-x-8">
          {["Explore", "Upload", "Profile", "Leaderboard"].map(
            (item, index) => (
              <li
                key={index}
                onClick={() =>
                  navigate(`/${item.toLowerCase().replace(" ", "")}`)
                }
                className="text-md hover:scale-95 font-semibold hover:text-indigo-400 transition duration-300 cursor-pointer"
              >
                {item}
              </li>
            )
          )}
        </ul>

        <button
          ref={darkRef}
          onClick={toggleDarkMode}
          className={`px-4 hover:scale-95 hidden sm:block text-4xl transition-all duration-300 ease-in-out
            hover:scale-125 hover:shadow-2xl hover:shadow-opacity-80 
            rounded-full p-3
            ${darkMode ? "hover:shadow-yellow-400" : "hover:shadow-gray-400"}
            active:scale-90`}
        >
          {darkMode ? "🌞" : "🌚"}
        </button>

        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col space-y-4 mt-4 bg-gray-700 dark:bg-gray-800 p-4 rounded-lg sm:hidden`}
      >
        <li
          onClick={() => handleNavigation("/explore")}
          className="text-md font-semibold hover:text-indigo-400 transition duration-300 cursor-pointer"
        >
          Meme Explorer
        </li>
        <li
          onClick={() => handleNavigation("/upload")}
          className="text-md font-semibold hover:text-indigo-400 transition duration-300 cursor-pointer"
        >
          Upload
        </li>
        <li
          onClick={() => handleNavigation("/profile")}
          className="text-md font-semibold hover:text-indigo-400 transition duration-300 cursor-pointer"
        >
          Profile
        </li>
        <li
          onClick={() => handleNavigation("/leaderboard")}
          className="text-md font-semibold hover:text-indigo-400 transition duration-300 cursor-pointer"
        >
          Leaderboard
        </li>

        <li>
          <button
            onClick={toggleDarkMode}
            className="px-4 text-4xl py-2 w-full"
          >
            {darkMode ? "🌞" : "🌚"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
