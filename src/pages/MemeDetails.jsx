import React, { useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MemeContext from "../ContextAPI/MemeContext";
import { gsap } from "gsap";
import { FaHeart } from "react-icons/fa";

const MemeDetails = () => {
  const { id } = useParams();
  const { memes, likes, comments, handleLike, handleCommentSubmit } =
    useContext(MemeContext);
  const meme = memes.find((m) => m.id === id);

  const [newComment, setNewComment] = useState("");
  const [localLikes, setLocalLikes] = useState(likes[id] || 0);

  const heartRef = useRef(null);

  if (!meme) {
    return <div className="text-center text-red-500">Meme not found!</div>;
  }

  const handleLikeClick = () => {
    gsap.to(heartRef.current, {
      scale: 2,
      rotation: 360,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.set(heartRef.current, { scale: 1, rotation: 0, opacity: 1 });
      },
    });

    setLocalLikes(localLikes + 1);
    handleLike(id);
  };

  const submitComment = (e) => {
    e.preventDefault();
    handleCommentSubmit(id, newComment);
    setNewComment("");
  };

  return (
    <div className="max-w-md mt-10 mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-black font-bold mb-4 text-center">
        {meme.name}
      </h2>
      <img src={meme.url} alt={meme.name} className="w-full rounded-md" />

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleLikeClick}
          className="relative flex items-center space-x-2 px-4 py-2 rounded-md text-white text-lg transition-all"
          onMouseEnter={() =>
            gsap.to(heartRef.current, {
              scale: 1.2,
              color: "#ff4500",
              duration: 0.3,
            })
          }
          onMouseLeave={() =>
            gsap.to(heartRef.current, {
              scale: 1,
              color: "#ff0000",
              duration: 0.3,
            })
          }
        >
          <FaHeart
            ref={heartRef}
            className="text-2xl text-red-500 transition-transform duration-200"
          />
          <span className="text-black font-bold">{localLikes}</span>
        </button>

        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
          🔗 Share
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg text-black font-semibold mb-2">Comments</h3>
        <ul className="space-y-2">
          {comments[id] && comments[id].length > 0 ? (
            comments[id].map((comment, index) => (
              <li key={index} className="bg-gray-100 p-2 text-black rounded-md">
                {comment}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          )}
        </ul>
        <form onSubmit={submitComment} className="mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 w-full rounded-md text-black"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemeDetails;
