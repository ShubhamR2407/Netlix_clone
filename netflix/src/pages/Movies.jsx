import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import Card from "../components/Card";
import movies from "../movies";
import genres from "../genres";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

const Movies = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const selectedGenre = useSelector((state) => state.netflix.selectedGenre);
  //   const getGenresLoaded = useSelector((state) => state.netflix.getGenresLoaded);

  // const genres = useSelector((state) => state.netflix.genres);
  // const movies = useSelector((state) => state.netflix.movies);
  //   const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getGenres())
  //   dispatch(fetchMovies());
  //   console.log("movies" , movies.data.data);
  //   console.log("genres" , genres);
  // }, []);

  useEffect(() => {
    if (selectedGenre && selectedGenre !== "") {
      const filtered = movies.filter((movie) =>
        movie.genres.includes(selectedGenre)
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedGenre]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {filteredMovies.length ? (
          <Slider movies={filteredMovies} />
        ) : (
          <NotAvailable />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default Movies;
