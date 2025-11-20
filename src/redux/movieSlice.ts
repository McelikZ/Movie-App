import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovie } from "./movieThunk";
import type { Movie } from "../services/movieAppService";

interface MovieState {
  moviesByEndpoint: Record<string, Movie[]>;
  loadingByEndpoint: Record<string, boolean>;
  errorByEndpoint: Record<string, string | null>;
}

const initialState: MovieState = {
  moviesByEndpoint: {},
  loadingByEndpoint: {},
  errorByEndpoint: {},
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovies: (state, action: PayloadAction<string>) => {
      const endpoint = action.payload;
      delete state.moviesByEndpoint[endpoint];
      delete state.loadingByEndpoint[endpoint];
      delete state.errorByEndpoint[endpoint];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state, action) => {
        const endpoint = action.meta.arg.endpoint;
        state.loadingByEndpoint[endpoint] = true;
        state.errorByEndpoint[endpoint] = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        const { endpoint, movies } = action.payload;
        state.moviesByEndpoint[endpoint] = movies;
        state.loadingByEndpoint[endpoint] = false;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        const endpoint = action.meta.arg.endpoint;
        state.loadingByEndpoint[endpoint] = false;
        state.errorByEndpoint[endpoint] =
          action.error.message || "Something went wrong";
      });
  },
});

export const { clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
