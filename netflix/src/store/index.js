import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  selectedGenre: null,
};

export const fetchMovies = createAsyncThunk("netflix/trending", async () => {
  const headers = {
    "X-RapidAPI-Key": "0aec7635ddmsh0bf75af037f92dcp1ba5a8jsn89c253d264eb",
    "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
  };
  const params = {
    page: "1",
    size: "20",
  };
  try {
    const response = await axios.get("https://anime-db.p.rapidapi.com/anime", {
      headers,
      params,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
});

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const headers = {
    "X-RapidAPI-Key": "0aec7635ddmsh0bf75af037f92dcp1ba5a8jsn89c253d264eb",
    "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
  };

  try {
    const { data } = await axios.get("https://anime-db.p.rapidapi.com/genre", {
      headers,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const getLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const response = await axios.get(
      `http://localhost:5000/api/user/liked/${email}`
    );
    const movies = response.data.data;
    return movies;
  }
);

export const removeFromLikedMovie = createAsyncThunk(
  "netflix/removeLiked",
  async ({movieId, email}) => {
    const response = await axios.put("http://localhost:5000/api/user/delete", {
      email,
      movieId,
    });
    const movies = response.data.data;
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: {
    getSelectedGenre(initialState, action) {
      initialState.selectedGenre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeFromLikedMovie.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const netflixActions = NetflixSlice.actions;

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
