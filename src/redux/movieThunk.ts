import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieService, Movie } from "../services/movieAppService";

export const fetchMovie = createAsyncThunk<
  { endpoint: string; movies: Movie[] },
  { endpoint: string; pageLimit?: number }
>("data/movieData", async ({ endpoint, pageLimit }, { rejectWithValue }) => {
  try {
    const movies = await fetchMovieService(endpoint, pageLimit || 3);
    return { endpoint, movies };
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error");
  }
});
