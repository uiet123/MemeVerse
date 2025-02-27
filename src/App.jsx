import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadMeme from "./pages/UploadMeme";
import UserProfile from "./pages/UserProfile";
import MemeDetails from "./pages/MemeDetails";
import Leaderboard from "./pages/LeaderBoard";
import NotFound from "./pages/NotFound";

const Home = React.lazy(() => import("./pages/Homepage"));
const MemeExplorer = React.lazy(() => import("./pages/MemeExplorer"));
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<MemeExplorer />} />
            <Route path="/upload" element={<UploadMeme />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/meme/:id" element={<MemeDetails />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
