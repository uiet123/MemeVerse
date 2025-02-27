import React, { createContext, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
const MemeContext = createContext();

export const MemeProvider = ({ children }) => {
  const URL = "https://api.imgflip.com/get_memes";
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [category, setCategory] = useState("All");
  const [trending, setTrending] = useState([]);
  const [uploadedMemes, setUploadedMemes] = useState(() => {
    return JSON.parse(localStorage.getItem("uploadedMemes")) || [];
  });

  const [likes, setLikes] = useState(() => {
    return JSON.parse(localStorage.getItem("likes")) || {};
  });
  const [comments, setComments] = useState(() => {
    return JSON.parse(localStorage.getItem("comments")) || {};
  });

  const [likedMemes, setLikedMemes] = useState(() => {
    return JSON.parse(localStorage.getItem("likedMemes")) || [];
  });

  useEffect(() => {
    const storedMemes = localStorage.getItem("uploadedMemes");
    if (storedMemes) {
      setUploadedMemes(JSON.parse(storedMemes));
    }
  }, []);

  const handleLike = (id) => {
    const updatedLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));

    const memeToLike = memes.find((meme) => meme.id === id);
    if (memeToLike && !likedMemes.some((m) => m.id === id)) {
      const updatedLikedMemes = [...likedMemes, memeToLike];
      setLikedMemes(updatedLikedMemes);
      localStorage.setItem("likedMemes", JSON.stringify(updatedLikedMemes));
    }
  };

  useEffect(() => {
    const storedLikedMemes = JSON.parse(localStorage.getItem("likedMemes"));
    if (storedLikedMemes) {
      setLikedMemes(storedLikedMemes);
    }
  }, []);

  const handleCommentSubmit = (id, newComment) => {
    if (newComment.trim() === "") return;

    const updatedComments = {
      ...comments,
      [id]: [...(comments[id] || []), newComment],
    };

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dehprspmt/image/upload";
  const UPLOAD_PRESET = "MemeVerse";

  const handleUpload = async (file, caption) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Cloudinary upload failed");

      const data = await response.json();
      const newMeme = {
        id: Date.now().toString(),
        url: data.secure_url,
        name: caption || "Untitled Meme",
      };

      setUploadedMemes((prev) => {
        const updatedMemes = [...prev, newMeme];

        localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));

        return updatedMemes;
      });
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  useEffect(() => {
    const storedMemes = localStorage.getItem("uploadedMemes");
    if (storedMemes) {
      setUploadedMemes(JSON.parse(storedMemes));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const APIdata = await response.json();
        setMemes(APIdata.data.memes);
        setLoading(false);
      } catch (error) {
        console.error("Error Message: ", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");

      document.body.className = newMode
        ? "bg-gray-900 text-white"
        : "bg-white text-black";

      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = darkMode
      ? "bg-gray-900 text-white"
      : "bg-white text-black";
  }, [darkMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      setFilteredMemes(
        memes.filter((meme) =>
          meme.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300),
    [memes]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    let sortedMemes = [...filteredMemes];

    if (sortOption === "likes") {
      sortedMemes.sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));
    } else if (sortOption === "comments") {
      sortedMemes.sort(
        (a, b) => (comments[b.id]?.length || 0) - (comments[a.id]?.length || 0)
      );
    } else {
      sortedMemes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredMemes(sortedMemes);
  }, [sortOption, memes, likes, comments]);

  // Filter by Category
  useEffect(() => {
    if (category === "All") {
      setFilteredMemes(memes);
    } else if (category === "trending") {
      setFilteredMemes(memes.filter((meme) => meme.box_count === 2));
    } else if (category === "new") {
      setFilteredMemes(memes.filter((meme) => meme.box_count === 3));
    } else if (category === "classic") {
      setFilteredMemes(memes.filter((meme) => meme.box_count === 4));
    } else {
      setFilteredMemes(memes);
    }
  }, [category, memes]);

  // trending memes
  useEffect(() => {
    setTrending(memes.filter((meme) => meme.box_count === 2));
  }, [memes]);

  return (
    <MemeContext.Provider
      value={{
        memes: filteredMemes,
        loading,
        error,
        darkMode,
        toggleDarkMode,
        isOpen,
        toggleMenu,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        category,
        setCategory,
        trending,
        uploadedMemes,
        handleUpload,
        likes,
        likedMemes,
        comments,
        handleLike,
        handleCommentSubmit,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};

export default MemeContext;
