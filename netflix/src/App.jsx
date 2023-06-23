import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Player from "./pages/Player";
import Netflix from "./pages/Netflix";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows"
import UserLiked from "./pages/UserLiked"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Netflix />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/player" element={<Player />} />
        <Route path="/mylist" element={<UserLiked />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
